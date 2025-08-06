"use server";

import { createServerFn } from "@tanstack/react-start";
import { and, eq, inArray } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import * as v from "valibot";
import { db } from "@/lib/db";
import { S } from "@/lib/schema";
import { organizationRequiredMiddlewareFn } from "@/server/auth-middleware";
import { generateTxId } from "@/server/generateTxId";

const customerInsertSchema = v.omit(createInsertSchema(S.customer), [
	"organizationId",
	"id",
]);

export const customerCreate = createServerFn()
	.middleware([organizationRequiredMiddlewareFn])
	.validator(customerInsertSchema)
	.handler(async (ctx) => {
		return db.transaction(async (tx) => {
			await tx.insert(S.customer).values({
				...ctx.data,
				organizationId: ctx.context.authInfo.session.activeOrganizationId,
			});

			const txid = await generateTxId(tx);

			return { txid };
		});
	});

const customerUpdateSchema = v.array(
	v.omit(
		createUpdateSchema(S.customer, {
			id: v.pipe(v.string(), v.uuid()),
		}),
		["organizationId"],
	),
);

export const customerUpdate = createServerFn()
	.middleware([organizationRequiredMiddlewareFn])
	.validator(customerUpdateSchema)
	.handler((ctx) => {
		return db.transaction(async (tx) => {
			const values = ctx.data.map((d) => ({
				...d,
				organizationId: ctx.context.authInfo.session.activeOrganizationId,
			}));

			await tx.query.customer.upsert({ data: values });
			const txid = await generateTxId(tx);

			return { txid };
		});
	});

const customerDeleteSchema = v.array(
	v.pipe(
		v.string(),
		v.uuid(),
		v.description("Service Ids to delete services for organizations"),
	),
);

export const customerDelete = createServerFn()
	.middleware([organizationRequiredMiddlewareFn])
	.validator(customerDeleteSchema)
	.handler((ctx) => {
		return db.transaction(async (tx) => {
			await tx
				.delete(S.customer)
				.where(
					and(
						inArray(S.customer.id, ctx.data),
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
