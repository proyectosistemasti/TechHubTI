import { ConvexError, v } from "convex/values";
import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Function to check if a user has access to shortcuts
async function hasAccessToShortcuts(ctx: QueryCtx | MutationCtx) {
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

  return { user };
}

// Mutation to create a shortcut
export const createShortcut = mutation({
  args: {
    url: v.string(),
    title: v.string(), // Added title
    description: v.optional(v.string()),
    password: v.optional(v.string()), // Added optional password
  },
  async handler(ctx, args) {
    const access = await hasAccessToShortcuts(ctx);

    if (!access) {
      throw new ConvexError("No access");
    }

    await ctx.db.insert("shortcuts", {
      url: args.url,
      title: args.title, // Include title
      description: args.description,
      password: args.password, // Include optional password
      userId: access.user._id,
    });
  },
});

// Query to get shortcuts
export const getShortcuts = query(async (ctx) => {
  const access = await hasAccessToShortcuts(ctx);

  if (!access) {
    return [];
  }

  const shortcuts = await ctx.db
    .query("shortcuts")
    .withIndex("by_userId", (q) => q.eq("userId", access.user._id))
    .collect();

  return shortcuts;
});

// Mutation to update a shortcut
export const updateShortcut = mutation({
  args: {
    shortcutId: v.id("shortcuts"),
    url: v.string(),
    title: v.string(), // Added title
    description: v.optional(v.string()),
    password: v.optional(v.string()), // Added optional password
  },
  async handler(ctx, args) {
    const access = await hasAccessToShortcuts(ctx);

    if (!access) {
      throw new ConvexError("No access");
    }

    const shortcut = await ctx.db.get(args.shortcutId);

    if (!shortcut || shortcut.userId !== access.user._id) {
      throw new ConvexError("No access to update this shortcut");
    }

    await ctx.db.patch(args.shortcutId, {
      url: args.url,
      title: args.title, // Update title
      description: args.description,
      password: args.password, // Update optional password
    });
  },
});

// Mutation to delete a shortcut
export const deleteShortcut = mutation({
  args: { shortcutId: v.id("shortcuts") },
  async handler(ctx, args) {
    const access = await hasAccessToShortcuts(ctx);

    if (!access) {
      throw new ConvexError("No access");
    }

    const shortcut = await ctx.db.get(args.shortcutId);

    if (!shortcut || shortcut.userId !== access.user._id) {
      throw new ConvexError("No access to delete this shortcut");
    }

    await ctx.db.delete(args.shortcutId);
  },
});
