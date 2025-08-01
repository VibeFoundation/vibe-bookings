import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import * as v from "valibot";
import { serviceOrganizationCreate } from "@/server/service-organization";

export const serviceOrganizationSchema = v.object({
	id: v.string(),
	priceEstimation: v.nullable(v.number()),
	durationEstimation: v.nullable(v.string()),
	organizationId: v.string(),
	serviceId: v.string(),
});

export type ServiceOrganizationSchema = v.InferOutput<
	typeof serviceOrganizationSchema
>;

export const serviceOrganizationCollection = createCollection(
	electricCollectionOptions({
		id: `todos`,
		shapeOptions: {
			url: `http://localhost:3100/api/electric/service-organization`,
		},
		getKey: (item) => item.id,
		schema: serviceOrganizationSchema,
		onInsert: async (params) => {
			const {
				id: _id,
				organizationId: _or,
				...modified
			} = params.transaction.mutations[0].modified;
			const res = await serviceOrganizationCreate({ data: modified });

			return { txid: res.txid };
		},
	}),
);
