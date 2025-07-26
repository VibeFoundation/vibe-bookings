import { phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { reactStartCookies } from "better-auth/react-start";

export const authClient = createAuthClient({
	plugins: [reactStartCookies(), phoneNumberClient()],
});
