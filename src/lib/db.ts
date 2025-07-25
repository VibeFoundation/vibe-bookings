import { drizzle } from "drizzle-orm/bun-sql";
import { serverEnv } from "./server-env";
import * as Schema from "./schema";

export const db = drizzle(serverEnv.DATABASE_URL, { schema: Schema });
