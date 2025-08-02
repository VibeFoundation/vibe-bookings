// compile-migrations.ts
import { readMigrationFiles } from "drizzle-orm/migrator";
import { join } from "node:path";

const migrations = readMigrationFiles({
	migrationsFolder: "./drizzle/migrations",
});

await Bun.write(
	join(import.meta.dir, "./src/migrations.json"),
	JSON.stringify(migrations),
);

console.log("Migrations compiled!");
