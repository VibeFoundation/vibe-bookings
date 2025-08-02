"use server";
import { drizzle } from "drizzle-orm/bun-sql";
import { R, S } from "./schema";
import { serverEnv } from "./server-env";

// if (process.env.NODE_ENV === "development") {
// 	globalThis.GLOBAL_DB = drizzle(serverEnv.DATABASE_URL, {
// 		schema: { ...S, ...R },
// 	});
// }

export const db =
	// process.env.NODE_ENV !== "development"
	drizzle(serverEnv.DATABASE_URL, { schema: { ...S, ...R } });
// : globalThis.GLOBAL_DB as ;
