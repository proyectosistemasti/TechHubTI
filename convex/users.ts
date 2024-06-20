import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    createUser: v.string()
  }
});

