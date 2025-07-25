import { createAuthClient } from "better-auth/client";
import { phoneNumberClient } from "better-auth/client/plugins";
import { reactStartCookies } from "better-auth/react-start";

export const authClient = createAuthClient({
	plugins: [reactStartCookies(), phoneNumberClient()],
});
