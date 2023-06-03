import { z } from "zod";
import { config } from "dotenv";
import path from "path";

if (!process.env.CI) {
  config({
    path: path.resolve(path.relative(process.cwd(), "../../"), ".env"),
  });
}

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  URL: z.string().optional(),
  PORT: z.number().optional().default(2022),
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
