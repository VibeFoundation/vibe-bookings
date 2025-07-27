import { foreignKey, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import * as Uuid from "uuid";
import { organization } from "./auth";

export const customer = pgTable(
	"customer",
	{
		id: uuid().$defaultFn(() => Uuid.v7()),
		firstName: varchar("first_name", { length: 128 }),
		lastName: varchar("last_name", { length: 128 }),
		phoneNumber: varchar("phone_number", { length: 16 }),
		organizationId: text("organization_id"),
	},
	(t) => [
		foreignKey({ columns: [t.id], foreignColumns: [organization.id] })
			.onDelete("cascade")
			.onUpdate("cascade"),
	],
);
