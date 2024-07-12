import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { getUser } from "./users";
import { fileTypes } from "./schema";

// Mutación para generar una URL de subida de archivo
export const generateUploadUrl = mutation(async (ctx) => {
  // Obtener la identidad del usuario
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    // Si no hay identidad, lanzar un error
    throw new ConvexError("You no have access to this Org");
  }

  // Generar y devolver la URL de subida
  return await ctx.storage.generateUploadUrl();
});

// Función para verificar si un usuario tiene acceso a una organización
async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) {
  // Obtener el usuario usando su tokenIdentifier
  const user = await getUser(ctx, tokenIdentifier);
  if (!user) {
    throw new ConvexError("Expected user to be defined");
  }

  // Verificar si el usuario tiene acceso a la organización
  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

  return hasAccess;
}

// Mutación para crear un archivo
export const createFile = mutation({
  args: {
    name: v.string(),
    fileId: v.id("_storage"),
    orgId: v.string(),
    type: fileTypes,
  },
  async handler(ctx, args) {
    // Obtener la identidad del usuario
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      // Si no hay identidad, lanzar un error
      throw new ConvexError("You must be logged in to upload a file");
    }

    // Verificar si el usuario tiene acceso a la organización
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) {
      throw new ConvexError("You no have access to this Org");
    }

    // Insertar el archivo en la base de datos
    await ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
      fileId: args.fileId,
      type: args.type,
    });
  },
});

// Consulta para obtener archivos de una organización
export const getFiles = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string())
  },
  async handler(ctx, args) {
    // Obtener la identidad del usuario
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    // Verificar si el usuario tiene acceso a la organización
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) {
      return [];
    }

    // Consultar y devolver los archivos de la organización
    const files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    const query = args.query

    if (query) {
      return files.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      return files;
    }

  },
});

// Mutación para eliminar un archivo
export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  async handler(ctx, args) {
    // Obtener la identidad del usuario
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You no have access to this Org");
    }

    // Obtener el archivo a eliminar
    const file = await ctx.db.get(args.fileId);

    if (!file) {
      throw new ConvexError("This file does not exist");
    }

    // Verificar si el usuario tiene acceso a la organización del archivo
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      file.orgId
    );

    if (!hasAccess) {
      throw new ConvexError("You do not have access to delete this file");
    }

    // Eliminar el archivo
    await ctx.db.delete(args.fileId);
  },
});

// Consulta para obtener la URL de un archivo
export const getFileUrl = query({
  args: {
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    // Obtener y devolver la URL del archivo
    const url = await ctx.storage.getUrl(args.fileId);
    return url;
  },
});
