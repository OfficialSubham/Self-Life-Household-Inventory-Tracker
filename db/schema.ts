import { sql } from "drizzle-orm";
import { check, integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category_enum", [
    "other",
    "produce",
    "dairy",
    "meat",
    "pantry",
    "frozen",
]);

export const itemStatusEnum = pgEnum("status_enum", [
    "fresh",
    "expiring-soon",
    "expired",
    "used",
    "wasted",
]);

export const Household = pgTable(
    "household",
    {
        _id: integer("_id").primaryKey().generatedAlwaysAsIdentity(),
        name: varchar("name", { length: 255 }).notNull(),
        inviteCode: varchar("invite_code", { length: 255 }).notNull().unique(),
        wasteScore: integer("waste_score").default(0),
    },
    (table) => [
        check(
            "waste_score_check",
            sql`${table.wasteScore} >= 0 AND ${table.wasteScore} <= 100`,
        ),
        //The above check can also be written as BETWEEN 0 AND 100
    ],
);

export const Users = pgTable("users", {
    _id: integer("_id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    householdId: integer("household_id").references(() => Household._id),
    createdAt: timestamp("created_at").defaultNow(),
});

export const Items = pgTable("items", {
    _id: integer("_id").primaryKey().generatedAlwaysAsIdentity(),
    householdId: integer("household_id")
        .notNull()
        .references(() => Household._id),
    addedBy: integer("added_by")
        .notNull()
        .references(() => Users._id),
    name: varchar("name", { length: 255 }).notNull(),
    category: categoryEnum("category").default("other"),
    expiryDate: timestamp("expiry_date"),
    status: itemStatusEnum("status").default("fresh"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
});
