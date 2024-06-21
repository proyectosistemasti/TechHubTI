import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {},
});
