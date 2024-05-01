import { sqliteTable, index, text, integer, numeric } from 'drizzle-orm/sqlite-core';

export const category_types = ['game', 'food'];

export const categories = sqliteTable('categories', {
  id: text('id', { enum: category_types }).primaryKey(),
  name: text('name').notNull(),
  singular: text('singular'),
}, (table) => ({
  idIdx: index("id_idx").on(table.id),
}));

export const options = sqliteTable('options', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type', { enum: category_types }).notNull(),
  imageURL: text('image_url')
}, (table) => ({
  nameIdx: index("name_idx").on(table.name),
}));

export const people = sqliteTable('people', {
  id: integer('id').primaryKey(),
  name: text('name').notNull()
}, (table) => ({
  nameIdx: index("name_idx").on(table.name),
}));

export const events = sqliteTable('events', {
  id: integer('id').primaryKey(),
  timestamp: numeric('timestamp', { mode: 'timestamp' }).notNull(),
  type: text('type', { enum: category_types }).notNull(),
});

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey(),
  eventId: integer('event_id').references(() => events.id),
  value: integer('vote').notNull(),
  personId: integer('person_id').references(() => people.id),
  optionId: integer('option_id').references(() => options.id)
});