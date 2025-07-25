import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

export const clientEnv = createEnv({
	client: { VITE_TITLE: v.optional(v.pipe(v.string(), v.minLength(4))) },
	clientPrefix: "VITE_",
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
