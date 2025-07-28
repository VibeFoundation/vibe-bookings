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
import { serviceOrganization } from "./service";

export const customer = pgTable(
	"customer",
	{
		id: uuid()
			.notNull()
			.$defaultFn(() => Uuid.v7()),
		firstName: varchar("first_name", { length: 128 }),
		lastName: varchar("last_name", { length: 128 }),
		phoneNumber: varchar("phone_number", { length: 16 }),
		organizationId: text("organization_id"),
	},
	(t) => [
		primaryKey({ columns: [t.id] }),
		foreignKey({
			columns: [t.organizationId],
			foreignColumns: [organization.id],
		})
			.onDelete("cascade")
			.onUpdate("cascade"),
	],
);

export const customerVisit = pgTable(
	"customer_visit",
	{
		id: uuid()
			.notNull()
			.$defaultFn(() => Uuid.v7()),
		date: timestamp(),
		customerId: uuid().notNull(),
	},
	(t) => [
		primaryKey({ columns: [t.id] }),
		foreignKey({
			columns: [t.customerId],
			foreignColumns: [customer.id],
		}),
	],
);

export const customerVisitService = pgTable(
	"customer_visit_service",
	{
		id: uuid()
			.notNull()
			.$defaultFn(() => Uuid.v7()),
		serviceOrganizationId: uuid("service_organization_id"),
		customService: text(),
		payment: doublePrecision(),
		duration: interval({ fields: "hour to minute" }),
		customerVisitId: uuid("customer_visit_id").notNull(),
	},
	(t) => [
		primaryKey({ columns: [t.id] }),
		foreignKey({
			columns: [t.customerVisitId],
			foreignColumns: [customerVisit.id],
		}),
		foreignKey({
			columns: [t.serviceOrganizationId],
			foreignColumns: [serviceOrganization.id],
		}),
	],
);
