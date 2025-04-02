import { sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const Quiz = sqliteTable('quiz', {
	id: text().notNull().primaryKey(),
	topic: text().notNull(),
	content: text().notNull(),
	creator: text()
})