import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf"),
  v.literal("doc"),
  v.literal("txt"),
  v.literal("xlsx"), // Added xlsx
  v.literal("pptx")  // Added pptx
);

export const roles = v.union(v.literal("admin"), v.literal("member"));

export const fileCategories = v.union(
  v.literal("manual"),
  v.literal("format"),
  v.literal("schedule"),
  v.literal("other") // Removed video
);

export default defineSchema({
  files: defineTable({
    name: v.string(),
    type: fileTypes,
    orgId: v.string(),
    fileId: v.id("_storage"),
    userId: v.id("users"),
    shouldDelete: v.optional(v.boolean()),
    category: fileCategories,
    uploadedAt: v.optional(v.number()), // Agregamos un campo para la marca de tiempo
  })
    .index("by_orgId", ["orgId"])
    .index("by_shouldDelete", ["shouldDelete"])
    .index("by_orgId_category", ["orgId", "category"])
    .index("by_category", ["category"]),

  favorites: defineTable({
    fileId: v.id("files"),
    orgId: v.string(),
    userId: v.id("users"),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    orgIds: v.array(
      v.object({
        orgId: v.string(),
        role: roles,
      })
    ),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  shortcuts: defineTable({
    url: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    password: v.optional(v.string()),
    userId: v.id("users"),
    orgId: v.string(), // Add orgId here
  })
    .index("by_userId", ["userId"])
    .index("by_orgId", ["orgId"]), //
});
