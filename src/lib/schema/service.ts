import { sql } from "drizzle-orm";
import {
	doublePrecision,
	foreignKey,
	interval,
	pgTable,
	primaryKey,
	text,
	timestamp,
	unique,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import * as Uuid from "uuid";
import { organization } from "./auth";
import { serviceTypeSchema } from "./helpers";

export const service = pgTable(
	"service",
	{
		id: uuid()
			.notNull()
			.$defaultFn(() => Uuid.v7()),
		type: varchar("type", {
			length: 128,
			enum: serviceTypeSchema.options,
		}).notNull(),
		updated_at: timestamp().$onUpdate(() => sql`now()`),
		created_at: timestamp().defaultNow().notNull(),
	},
	(t) => [primaryKey({ columns: [t.id] }), unique().on(t.type)],
);

export const serviceOrganization = pgTable(
	"service_organization",
	{
		id: uuid()
			.notNull()
			.$defaultFn(() => Uuid.v7()),
		priceEstimation: doublePrecision("price_estimation"),
		durationEstimation: interval("duration_estimation", {
			fields: "hour to minute",
		}),
		organizationId: text("organization_id").notNull(),
		serviceId: uuid("service_id").notNull(),
	},
	(t) => [
		primaryKey({ columns: [t.id] }),
		foreignKey({
			columns: [t.serviceId],
			foreignColumns: [service.id],
		})
			.onDelete("cascade")
			.onUpdate("cascade"),
		foreignKey({
			columns: [t.organizationId],
			foreignColumns: [organization.id],
		})
			.onDelete("cascade")
			.onUpdate("cascade"),
		unique().on(t.organizationId, t.serviceId),
	],
);
