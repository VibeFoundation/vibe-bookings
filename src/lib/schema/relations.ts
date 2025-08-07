import { defineRelations } from "drizzle-orm";
import * as S from "./schema";

export const relations = defineRelations(S, (r) => ({
	service: { forOrganizations: r.many.serviceOrganization() },
	serviceOrganization: {
		service: r.one.service({
			from: r.serviceOrganization.serviceId,
			to: r.service.id,
		}),
		organization: r.one.organization({
			from: r.serviceOrganization.organizationId,
			to: r.organization.id,
		}),
	},
	organization: {
		services: r.many.serviceOrganization(),
		customers: r.many.customer(),
	},
	customer: {
		organization: r.one.organization({
			from: r.customer.organizationId,
			to: r.organization.id,
		}),
	},
	customerVisit: {
		services: r.many.customerVisitService(),
		customer: r.one.customer({
			from: r.customerVisit.customerId,
			to: r.customer.id,
		}),
	},
	customerVisitService: {
		customerVisit: r.one.customerVisit({
			from: r.customerVisitService.customerVisitId,
			to: r.customerVisit.id,
		}),
		serviceOrganization: r.one.serviceOrganization({
			from: r.customerVisitService.serviceOrganizationId,
			to: r.serviceOrganization.id,
		}),
	},
}));
