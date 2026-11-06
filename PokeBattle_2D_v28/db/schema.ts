import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const users=sqliteTable('club_users',{id:text('id').primaryKey(),email:text('email').notNull().unique(),hash:text('hash').notNull(),salt:text('salt').notNull(),state:text('state').notNull(),version:integer('version').notNull().default(0),created:integer('created').notNull()});
export const sessions=sqliteTable('club_sessions',{token:text('token').primaryKey(),user:text('user_id').notNull(),expires:integer('expires').notNull()});
export const rooms=sqliteTable('club_rooms',{id:text('id').primaryKey(),host:text('host').notNull(),guest:text('guest'),state:text('state').notNull(),version:integer('version').notNull().default(0),updated:integer('updated').notNull()});
export const trades=sqliteTable('club_trades',{id:text('id').primaryKey(),owner:text('owner').notNull(),partner:text('partner'),offered:text('offered').notNull(),requested:text('requested'),status:text('status').notNull().default('open'),updated:integer('updated').notNull()});
export const limits=sqliteTable('club_limits',{id:text('id').primaryKey(),count:integer('count').notNull().default(0),until:integer('until').notNull()});

export const friends=sqliteTable('club_friends',{id:text('id').primaryKey(),sender:text('sender').notNull(),receiver:text('receiver').notNull(),status:text('status').notNull().default('pending'),created:integer('created').notNull(),updated:integer('updated').notNull()});
