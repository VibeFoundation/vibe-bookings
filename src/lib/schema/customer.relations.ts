import { relations } from "drizzle-orm";
import { organization } from "./auth";
import { customer } from "./customer";

export const customerRelations = relations(customer, ({ one }) => ({
	organization: one(organization, {
		fields: [customer.organizationId],
		references: [organization.id],
	}),
}));
