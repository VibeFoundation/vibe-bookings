import { db } from "./db";
import { S } from "./schema";
import { serviceTypeSchema } from "./schema/helpers";

// seed services
await db
	.insert(S.service)
	.values(
		serviceTypeSchema.options.map((v) => ({
			type: v,
		})),
	)
	.onConflictDoNothing();
