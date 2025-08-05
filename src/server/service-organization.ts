"use server";
import { createServerFn } from "@tanstack/react-start";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import * as v from "valibot";
import { db } from "@/lib/db";
import { S } from "@/lib/schema";
import { organizationRequiredMiddlewareFn } from "./auth-middleware";
import { generateTxId } from "./generateTxId";

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

export const serviceCoranizationUpdate = createServerFn()
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
