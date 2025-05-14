import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  activationCode: integer(),
  email: text().unique(),
  isAdmin: integer({ mode: "boolean" }).default(false),
  name: text().notNull(),
  passwordHash: text(),
  verificationStatus: text({
    enum: [
      "pending-email-verification",
      "pending-admin-verification",
      "verified",
    ],
  })
    .notNull()
    .default("pending-email-verification"),
});
