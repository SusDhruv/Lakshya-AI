import { pgTable, serial, varchar, json, timestamp } from "drizzle-orm/pg-core";

export const Lakshya_Data = pgTable("mockInt", {
  id: serial("id").primaryKey(),
  jsonMockResponse: json("jsonMockResponse").notNull(),
  jobPoistion: varchar("jobPoistion", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});
