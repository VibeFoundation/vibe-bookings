"use server";
import { createServerFn } from "@tanstack/react-start";
import { createInsertSchema } from "drizzle-valibot";
import * as v from "valibot";
import { db } from "@/lib/db";
import { S } from "@/lib/schema";
import { authPrivateMiddlewareFn } from "./auth-middleware";
import { generateTxId } from "./generateTxId";

const serviceOrganizationInsertSchema = v.omit(
	createInsertSchema(S.serviceOrganization),
	["organizationId", "id"],
);

export const serviceOrganizationCreate = createServerFn()
	.middleware([authPrivateMiddlewareFn])
	.validator(serviceOrganizationInsertSchema)
	.handler(async (ctx) => {
		return db.transaction(async (tx) => {
			const txid = await generateTxId(tx);

			if (!ctx.context.authInfo.session.activeOrganizationId) {
				throw new Error("Please select an organization first");
			}

			await tx.insert(S.serviceOrganization).values({
				...ctx.data,
				organizationId: ctx.context.authInfo.session.activeOrganizationId,
			});

			return { txid };
		});
	});
