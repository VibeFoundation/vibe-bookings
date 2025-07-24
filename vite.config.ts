import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { wrapVinxiConfigWithSentry } from "@sentry/tanstackstart-react";

const config = defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
			strategy: ["baseLocale"],
		}),
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart({ customViteReactPlugin: true, spa: { enabled: true } }),
		react(),
	],
});

export default wrapVinxiConfigWithSentry(config, {
	org: process.env.VITE_SENTRY_ORG,
	project: process.env.VITE_SENTRY_PROJECT,
	authToken: process.env.SENTRY_AUTH_TOKEN,
	// Only print logs for uploading source maps in CI
	// Set to `true` to suppress logs
	silent: !process.env.CI,
});
