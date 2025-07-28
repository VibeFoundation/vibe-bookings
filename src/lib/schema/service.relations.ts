import { relations } from "drizzle-orm";
import { organization } from "./auth";
import { customerVisit } from "./customer";
import { service, serviceOrganization } from "./service";

export const serviceRelations = relations(service, ({ many }) => ({
	serviceOrganization: many(serviceOrganization),
}));

export const serviceOrganizationRelations = relations(
	serviceOrganization,
	({ one, many }) => ({
		service: one(service, {
			fields: [serviceOrganization.serviceId],
			references: [service.id],
		}),
		organization: one(organization, {
			fields: [serviceOrganization.organizationId],
			references: [organization.id],
		}),
		customerVisits: many(customerVisit),
	}),
);
