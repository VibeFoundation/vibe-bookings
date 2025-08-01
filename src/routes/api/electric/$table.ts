import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { serverEnv } from "@/lib/server-env";

export const ServerRoute = createServerFileRoute(
	"/api/electric/$table",
).methods({
	GET: async ({ params, request }) => {
		const info = await auth.api.getSession(request);
		if (!info) {
			return new Response("Unauthorized Access", { status: 401 });
		}

		const incomingUrl = new URL(request.url);
		const electricUrl = new URL(serverEnv.ELECTRIC_URL);
		// Copy over the relevant query params that the Electric client adds
		// so that we return the right part of the Shape log.
		incomingUrl.searchParams.forEach((value, key) => {
			if ([`live`, `handle`, `offset`, `cursor`].includes(key)) {
				electricUrl.searchParams.set(key, value);
			}
		});

		electricUrl.searchParams.set("table", params.table);

		if (!GENERAL_TABLES.includes(params.table)) {
			incomingUrl.searchParams.set("where", `"organization_id"`);
		}

		const response = await fetch(electricUrl);

		// Fetch decompresses the body but doesn't remove the
		// content-encoding & content-length headers which would
		// break decoding in the browser.
		//
		// See https://github.com/whatwg/fetch/issues/1729
		const headers = new Headers(response.headers);
		headers.delete(`content-encoding`);
		headers.delete(`content-length`);

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	},
});

const GENERAL_TABLES = ["service"];
