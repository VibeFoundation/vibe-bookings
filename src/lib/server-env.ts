import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

export const serverEnv = createEnv({
	server: {
		DATABASE_URL: v.pipe(v.string(), v.minLength(5)),
		ELECTRIC_URL: v.pipe(v.string(), v.url()),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
