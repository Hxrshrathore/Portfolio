import { pgTable, text, timestamp, boolean, jsonb, uuid, varchar } from "drizzle-orm/pg-core";

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  author: varchar("author", { length: 255 }).default("hxrshrathore").notNull(),
  image: text("image"),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  content: text("content").notNull(),
  readingTime: varchar("reading_time", { length: 50 }),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id", { length: 255 }).primaryKey(), // Using string ID to match existing hardcoded IDs
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  image: text("image").notNull(),
  heroImage: text("hero_image").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  domain: varchar("domain", { length: 100 }).notNull(), // e.g. DATA ANALYST
  status: varchar("status", { length: 50 }).notNull(), // e.g. ACTIVE
  date: varchar("date", { length: 100 }).notNull(), // Month Year string
  category: text("category"), // Deprecated but kept for compatibility
  featured: boolean("featured").default(false).notNull(),
  demoUrl: text("demo_url"),
  githubUrl: text("github_url"),
  technologies: jsonb("technologies").$type<string[]>().default([]).notNull(),
  challenges: jsonb("challenges").$type<string[]>().default([]).notNull(),
  solutions: jsonb("solutions").$type<string[]>().default([]).notNull(),
  results: jsonb("results").$type<string[]>().default([]).notNull(),
  process: jsonb("process").$type<{
    title: string;
    description: string;
    contentType?: string;
  }[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
