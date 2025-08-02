import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import * as v from "valibot";
import { serviceTypeEnum } from "@/lib/schema/service";

export const serviceSchema = v.object({
	id: v.string(),
	type: serviceTypeEnum,
	updated_at: v.nullable(v.date()),
	created_at: v.date(),
});

export type ServiceSchema = v.InferOutput<typeof serviceSchema>;

export const serviceCollection = createCollection(
	electricCollectionOptions({
		id: `service`,
		shapeOptions: {
			url: `http://localhost:3002/api/electric/service`,
			parser: {
				timestamptz: (date: string) => new Date(date),
			},
		},
		getKey: (item) => item.id,
		schema: serviceSchema,
	}),
);
