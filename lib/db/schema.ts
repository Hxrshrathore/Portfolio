import { pgTable, text, timestamp, boolean, jsonb, uuid, varchar, integer } from "drizzle-orm/pg-core";

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
  metrics: jsonb("metrics").$type<{
    label: string;
    value: number;
    unit?: string;
    data?: { name: string; value: number }[];
    type?: 'area' | 'bar' | 'pie' | 'radar';
  }[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Represented in cents
  category: varchar("category", { length: 100 }).notNull(), // Templates, Assets, Components
  images: jsonb("images").$type<string[]>().default([]).notNull(),
  features: jsonb("features").$type<string[]>().default([]).notNull(),
  demoUrl: text("demo_url"),
  downloadUrl: text("download_url"),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  projectType: varchar("project_type", { length: 100 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const bugReports = pgTable("bug_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  pageUrl: text("page_url").notNull(),
  issueType: varchar("issue_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  userAgent: text("user_agent"),
  resolved: boolean("resolved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Page view analytics
export const pageViews = pgTable("page_views", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  url: text("url").notNull(),
  pathname: varchar("pathname", { length: 500 }).notNull(),
  referrer: text("referrer"),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  utmContent: varchar("utm_content", { length: 100 }),
  utmTerm: varchar("utm_term", { length: 100 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  device: varchar("device", { length: 50 }),   // desktop | mobile | tablet
  os: varchar("os", { length: 100 }),
  browser: varchar("browser", { length: 100 }),
  screenWidth: integer("screen_width"),
  screenHeight: integer("screen_height"),
  duration: integer("duration"),               // seconds on page
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Heatmap click events
export const clickEvents = pgTable("click_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  pathname: varchar("pathname", { length: 500 }).notNull(),
  xPercent: integer("x_percent").notNull(),    // % of viewport width
  yPercent: integer("y_percent").notNull(),    // % of viewport height (absolute scroll pos)
  element: varchar("element", { length: 200 }), // CSS selector of clicked el
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
