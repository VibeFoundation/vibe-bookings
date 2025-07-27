import { sql } from "drizzle-orm";
import {
	foreignKey,
	interval,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import * as Uuid from "uuid";
import { organization } from "./auth";

export const service = pgTable(
	"service",
	{
		id: uuid().$defaultFn(() => Uuid.v7()),
		type: varchar("type", { length: 128, enum: ["pedicure"] }),
		duration: interval("duration", { fields: "hour to minute" }),
		organizationId: text("organization_id"),
		updated_at: timestamp().$onUpdate(() => sql`now()`),
		created_at: timestamp().defaultNow().notNull(),
	},
	(t) => [
		foreignKey({
			columns: [t.organizationId],
			foreignColumns: [organization.id],
		})
			.onDelete("cascade")
			.onUpdate("cascade"),
	],
);

export const serviceTitle = pgTable(
	"service_title",
	{
		id: uuid(),
		language: varchar("language", { length: 2, enum: ["en", "fa"] }),
		serviceId: uuid("service_id"),
		organizationId: text("organization_id"),
	},
	(t) => [
		foreignKey({
			columns: [t.organizationId],
			foreignColumns: [organization.id],
		})
			.onDelete("cascade")
			.onUpdate("cascade"),

		foreignKey({
			columns: [t.serviceId],
			foreignColumns: [service.id],
		})
			.onDelete("cascade")
			.onUpdate("cascade"),

		uniqueIndex().on(t.language, t.serviceId),
	],
);
