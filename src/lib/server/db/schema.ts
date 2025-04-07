import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const Quiz = pgTable('quiz', {
	id: varchar({length: 20}).primaryKey(),
	topic: varchar({length: 256}).notNull(),
	content: text().notNull(),
})