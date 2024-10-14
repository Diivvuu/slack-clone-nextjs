import { mutation } from "./_generated/server";

export const generateUploadURL = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
