import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import * as v from "valibot";

export const serviceSchema = v.object({
	id: v.string(),
	type: v.string(),
	updated_at: v.date(),
	created_at: v.date(),
});

export type ServiceSchema = v.InferOutput<typeof serviceSchema>;

export const serviceCollection = createCollection(
	electricCollectionOptions({
		id: `todos`,
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
