import type { Txid } from "@tanstack/electric-db-collection";
import { sql } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";

// Generate a transaction ID
export async function generateTxId(
	// biome-ignore lint/suspicious/noExplicitAny: any type of drizzle transaction is accepted
	tx: PgTransaction<any, any, any>,
): Promise<Txid> {
	// The ::xid cast strips off the epoch, giving you the raw 32-bit value
	// that matches what PostgreSQL sends in logical replication streams
	// (and then exposed through Electric which we'll match against
	// in the client).
	const result = await tx.execute<{ txid: string }>(
		sql`SELECT pg_current_xact_id()::xid::text as txid`,
	);

	const txid = result[0]?.txid;

	if (txid === undefined) {
		throw new Error(`Failed to get transaction ID`);
	}

	return parseInt(txid, 10);
}
