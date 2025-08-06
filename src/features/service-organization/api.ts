"use server";

import { createServerFn } from "@tanstack/react-start";
import { and, eq, inArray } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import * as v from "valibot";
import { db } from "@/lib/db";
import { S } from "@/lib/schema";
import { organizationRequiredMiddlewareFn } from "@/server/auth-middleware";
import { generateTxId } from "@/server/generateTxId";

const serviceOrganizationInsertSchema = v.omit(
	createInsertSchema(S.serviceOrganization),
	["organizationId", "id"],
);

export const serviceOrganizationCreate = createServerFn()
	.middleware([organizationRequiredMiddlewareFn])
	.validator(serviceOrganizationInsertSchema)
	.handler(async (ctx) => {
		return db.transaction(async (tx) => {
			await tx.insert(S.serviceOrganization).values({
				...ctx.data,
				organizationId: ctx.context.authInfo.session.activeOrganizationId,
			});

			const txid = await generateTxId(tx);

			return { txid };
		});
	});

const serviceOrganizationUpdateSchema = v.array(
	v.omit(
		createUpdateSchema(S.serviceOrganization, {
			serviceId: v.pipe(v.string(), v.uuid()),
		}),
		["id", "organizationId"],
	),
);

export const serviceOrganizationUpdate = createServerFn()
	.middleware([organizationRequiredMiddlewareFn])
	.validator(serviceOrganizationUpdateSchema)
	.handler((ctx) => {
		return db.transaction(async (tx) => {
			const values = ctx.data.map((d) => ({
				...d,
				organizationId: ctx.context.authInfo.session.activeOrganizationId,
			}));

			await tx.query.serviceOrganization.upsert({ data: values });
			const txid = await generateTxId(tx);

			return { txid };
		});
	});

const serviceOrganizationDeleteSchema = v.array(
	v.pipe(
		v.string(),
		v.uuid(),
		v.description("Service Ids to delete services for organizations"),
	),
);

export const serviceCoranizationDelete = createServerFn()
	.middleware([organizationRequiredMiddlewareFn])
	.validator(serviceOrganizationDeleteSchema)
	.handler((ctx) => {
		return db.transaction(async (tx) => {
			await tx
				.delete(S.serviceOrganization)
				.where(
					and(
						inArray(S.serviceOrganization.serviceId, ctx.data),
						eq(
							S.serviceOrganization.organizationId,
							ctx.context.authInfo.session.activeOrganizationId,
						),
					),
				);

			const txid = await generateTxId(tx);

			return { txid };
		});
	});
