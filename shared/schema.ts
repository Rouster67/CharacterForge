import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// D&D Stat Types
export type StatName = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface StatOption {
  score: number;
  cost: number;
}

export interface QuizQuestion {
  id: number;
  statA: StatName;
  statB: StatName;
  optionA: {
    title: string;
    description: string;
    icon: string;
  };
  optionB: {
    title: string;
    description: string;
    icon: string;
  };
}

export interface StatResult {
  name: StatName;
  wins: number;
  percentage: number;
  finalScore: number;
  cost: number;
  color: string;
  icon: string;
}

export interface QuizResults {
  stats: StatResult[];
  totalCost: number;
  isValid: boolean;
}
