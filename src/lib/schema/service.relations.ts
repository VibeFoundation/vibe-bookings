import { relations } from "drizzle-orm";
import { organization } from "./auth";
import { service, serviceTitle } from "./service";

export const serviceTitleRelations = relations(serviceTitle, ({ one }) => ({
	service: one(service, {
		fields: [serviceTitle.serviceId],
		references: [service.id],
	}),
	organization: one(organization, {
		fields: [serviceTitle.organizationId],
		references: [organization.id],
	}),
}));

export const serviceRelations = relations(service, ({ one }) => ({
	organization: one(organization, {
		fields: [service.organizationId],
		references: [organization.id],
	}),
}));
