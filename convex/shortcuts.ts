// shortcuts.ts

import { ConvexError, v } from "convex/values";
import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Función para verificar si un usuario tiene acceso a los accesos directos
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

// Mutación para crear un acceso directo
export const createShortcut = mutation({
  args: {
    url: v.string(),
    description: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const access = await hasAccessToShortcuts(ctx);

    if (!access) {
      throw new ConvexError("No access");
    }

    await ctx.db.insert("shortcuts", {
      url: args.url,
      description: args.description,
      userId: access.user._id,
    });
  },
});

// Consulta para obtener accesos directos
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

// Mutación para actualizar un acceso directo
export const updateShortcut = mutation({
  args: {
    shortcutId: v.id("shortcuts"),
    url: v.string(),
    description: v.optional(v.string()),
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
      description: args.description,
    });
  },
});

// Mutación para eliminar un acceso directo
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
