"use server";
import { drizzle } from "drizzle-orm/bun-sql";
import { S } from "./schema";
import { relations } from "./schema/relations";
import { serverEnv } from "./server-env";
import "drizzle-plus/pg/upsert";
import "drizzle-plus/pg/findUnique";
import "drizzle-plus/pg/findManyAndCount";
import "drizzle-plus/pg/updateMany";

export const db = drizzle(serverEnv.DATABASE_URL, { relations, schema: S });
