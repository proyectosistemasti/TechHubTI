import { ConvexError, v } from "convex/values";
import { internalMutation, MutationCtx, QueryCtx } from "./_generated/server";

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string) {

  const user =  await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .first();


    if(!user) {
      throw new ConvexError("Expected user to be defined")
    }

    return user;

}

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgIds: [],
    });
  },
});

export const addOrgToUser = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string() },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier)


    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, args.orgId],
    });

    //! Hay que revisar minuto 1:00:25
    // await ctx.db.insert("users", {
    //   tokenIdentifier: args.tokenIdentifier,
    //   orgIds: [...user.orgIds, args.orgId],
    // });
  },
});
