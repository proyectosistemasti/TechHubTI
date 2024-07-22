import { ConvexError, v } from "convex/values";
import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Function to check if a user has access to shortcuts
async function getUserAndOrg(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();

  if (!user) {
    return null;
  }

  // Assuming the user is part of one organization, take the first one
  const orgId = user.orgIds.length > 0 ? user.orgIds[0].orgId : null;

  if (!orgId) {
    return null;
  }

  return { user, orgId };
}

// Mutation to create a shortcut
export const createShortcut = mutation({
  args: {
    url: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    password: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const access = await getUserAndOrg(ctx);

    if (!access) {
      throw new ConvexError("No access");
    }

    await ctx.db.insert("shortcuts", {
      url: args.url,
      title: args.title,
      description: args.description,
      password: args.password,
      userId: access.user._id,
      orgId: access.orgId, // Add orgId here
    });
  },
});

// Query to get shortcuts
export const getShortcuts = query(async (ctx) => {
  const access = await getUserAndOrg(ctx);

  if (!access) {
    return [];
  }

  const shortcuts = await ctx.db
    .query("shortcuts")
    .withIndex("by_orgId", (q) => q.eq("orgId", access.orgId)) // Query by orgId instead of userId
    .collect();

  return shortcuts;
});

// Mutation to update a shortcut
export const updateShortcut = mutation({
  args: {
    shortcutId: v.id("shortcuts"),
    url: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    password: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const access = await getUserAndOrg(ctx);

    if (!access) {
      throw new ConvexError("No access");
    }

    const shortcut = await ctx.db.get(args.shortcutId);

    if (!shortcut) {
      throw new ConvexError("Shortcut not found");
    }

    await ctx.db.patch(args.shortcutId, {
      url: args.url,
      title: args.title,
      description: args.description,
      password: args.password,
    });
  },
});

// Mutation to delete a shortcut
export const deleteShortcut = mutation({
  args: { shortcutId: v.id("shortcuts") },
  async handler(ctx, args) {
    const access = await getUserAndOrg(ctx);

    if (!access) {
      throw new ConvexError("No access");
    }

    const shortcut = await ctx.db.get(args.shortcutId);

    if (!shortcut) {
      throw new ConvexError("Shortcut not found");
    }

    await ctx.db.delete(args.shortcutId);
  },
});
