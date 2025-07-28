import { drizzle } from "drizzle-orm/bun-sql";
import { R, S } from "./schema";
import { serverEnv } from "./server-env";

export const db = drizzle(serverEnv.DATABASE_URL, { schema: { ...S, ...R } });
