/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
import { z } from "zod";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(path.relative(process.cwd(), "../../"), ".env") });

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 4)
  );
  process.exit(1);
}

const env = parsedEnv.data;

export { env };
