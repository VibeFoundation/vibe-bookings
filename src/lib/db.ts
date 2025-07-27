import { drizzle } from "drizzle-orm/bun-sql";
import * as Schema from "./schema";
import { serverEnv } from "./server-env";

const { S: _, ..._Schema } = Schema;
export const db = drizzle(serverEnv.DATABASE_URL, { schema: _Schema });
