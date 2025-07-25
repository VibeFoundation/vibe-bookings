import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

export const serverEnv = createEnv({
	server: {
		DATABASE_URL: v.pipe(v.string(), v.minLength(5)),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
