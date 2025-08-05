import { defineRelations } from "drizzle-orm";
import { organization } from "./auth";
import { customerVisit } from "./customer";
import { service, serviceOrganization } from "./service";

export const serviceRelations = defineRelations(
	{ service, serviceOrganization, organization, customerVisit },
	(r) => ({
		service: { forOrganizations: r.many.serviceOrganization() },
		serviceOrganization: {
			service: r.one.service({
				from: r.serviceOrganization.serviceId,
				to: r.service.id,
			}),
		},
		organization: {
			services: r.many.serviceOrganization(),
		},
		customerVisit: {
			visits: r.many.customerVisit(),
		},
	}),
);
