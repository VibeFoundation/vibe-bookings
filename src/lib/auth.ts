import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization, phoneNumber } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { OTP_TIMEOUT } from "@/utils/otp-timeout";
import { db } from "./db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),

	appName: "Nobatki",
	databaseHooks: {
		verification: {
			create: {
				async after(verification, context) {
					await auth.api.createOrganization({});
				},
			},
		},
	},

	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache duration in seconds
		},
	},

	emailAndPassword: { enabled: false },

	plugins: [
		reactStartCookies(),
		organization(),
		phoneNumber({
			sendOTP: (opts, _req) => {
				console.log("SENDING OTP: ", opts);
			},
			expiresIn: OTP_TIMEOUT,
			signUpOnVerification: {
				getTempEmail: (phoneNumber) => {
					return `${phoneNumber}@nobatki.com`;
				},
				//optionally, you can also pass `getTempName` function to generate a temporary name for the user
				getTempName: (phoneNumber) => {
					return phoneNumber; //by default, it will use the phone number as the name
				},
			},
		}),
	],
});
