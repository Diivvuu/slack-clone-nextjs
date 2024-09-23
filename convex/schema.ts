import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  workspaces: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),
  // Your other tables...
});

export default schema;
