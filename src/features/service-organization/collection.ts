import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import * as v from "valibot";
import {
	serviceCoranizationDelete,
	serviceOrganizationCreate,
	serviceOrganizationUpdate,
} from "./api";

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
		id: `service-organization`,
		shapeOptions: {
			url: `http://localhost:3002/api/electric/service-organization`,
		},
		getKey: (item) => item.id,
		schema: serviceOrganizationSchema,
		onInsert: async (params) => {
			const {
				id: _id,
				organizationId: _oid,
				...modified
			} = params.transaction.mutations[0].modified;
			const res = await serviceOrganizationCreate({ data: modified });

			return { txid: res.txid };
		},
		onUpdate: async (params) => {
			const data = params.transaction.mutations?.map((m) => {
				const { id: _id, organizationId: _oid, ...v } = m.modified;

				return v;
			});

			const res = await serviceOrganizationUpdate({ data });

			return { txid: res.txid };
		},
		onDelete: async (params) => {
			const serviceIds = params.transaction.mutations?.map(
				(v) => v.modified.serviceId,
			);

			const res = await serviceCoranizationDelete({ data: serviceIds });

			return { txid: res.txid };
		},
	}),
);
