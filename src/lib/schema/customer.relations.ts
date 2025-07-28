import { relations } from "drizzle-orm";
import { organization } from "./auth";
import { customer, customerVisit, customerVisitService } from "./customer";
import { service } from "./service";

export const customerRelations = relations(customer, ({ one, many }) => ({
	organization: one(organization, {
		fields: [customer.organizationId],
		references: [organization.id],
	}),
	visits: many(customerVisit),
}));

export const customerVisitRelations = relations(
	customerVisit,
	({ one, many }) => ({
		customer: one(customer, {
			fields: [customerVisit.customerId],
			references: [customer.id],
		}),
		visitServices: many(customerVisitService),
	}),
);

export const customerVisitServiceRelations = relations(
	customerVisitService,
	({ one }) => ({
		customerVisit: one(customerVisit, {
			fields: [customerVisitService.customerVisitId],
			references: [customerVisit.id],
		}),
		service: one(service, {
			fields: [customerVisitService.serviceOrganizationId],
			references: [service.id],
		}),
	}),
);
