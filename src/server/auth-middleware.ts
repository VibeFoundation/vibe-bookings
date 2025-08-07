import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const authPrivateMiddlewareRequest = createMiddleware({
	type: "request",
}).server(async (ctx) => {
	const authInfo = await auth.api.getSession(ctx.request);

	if (!authInfo) {
		throw UnauthorizedResponse();
	}

	return ctx.next({ context: { authInfo } });
});

export const authPrivateMiddlewareFn = createMiddleware({
	type: "function",
}).server(async (ctx) => {
	const headers = new Headers(
		Object.entries(getRequestHeaders()).filter(
			(v): v is [string, string] => !!v[1],
		),
	);
	const authInfo = await auth.api.getSession({ headers });

	if (!authInfo) {
		throw UnauthorizedResponse();
	}

	return ctx.next({ context: { authInfo } });
});

export const organizationRequiredMiddlewareFn = createMiddleware({
	type: "function",
})
	.middleware([authPrivateMiddlewareFn])
	.server(async (ctx) => {
		const activeOrgId = ctx.context.authInfo.session.activeOrganizationId;
		if (!activeOrgId) {
			throw new Error("Please select an organization first");
		}

		return ctx.next({
			context: {
				authInfo: {
					...ctx.context.authInfo,
					session: {
						...ctx.context.authInfo.session,
						activeOrganizationId: activeOrgId,
					},
				},
			},
		});
	});

function UnauthorizedResponse() {
	return new Response("Unauthorized Request", { status: 401 });
}
