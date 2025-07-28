import { sql } from "drizzle-orm";
import {
	doublePrecision,
	foreignKey,
	interval,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import * as Uuid from "uuid";
import { organization } from "./auth";

export const service = pgTable(
	"service",
	{
		id: uuid()
			.notNull()
			.$defaultFn(() => Uuid.v7()),
		type: varchar("type", {
			length: 128,
			enum: [
				"pedicure",
				"manicure",
				"nail_extension",
				"hair_extension",
				"hair_braiding",
				"hair_dyeing",
				"hair_cutting",
				"makeup",
				"shinion",
				"eyelash_extension",
				"brow_micro_blading",
				"lip_shading",
				"piercing",
				"tattoo",
				"laser",
				"waxing",
			],
		}).notNull(),
		updated_at: timestamp().$onUpdate(() => sql`now()`),
		created_at: timestamp().defaultNow().notNull(),
	},
	(t) => [primaryKey({ columns: [t.id] })],
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
	],
);
