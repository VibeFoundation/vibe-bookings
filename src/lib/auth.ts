import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { phoneNumber } from "better-auth/plugins";
import { organization } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),

	emailAndPassword: { enabled: false },

	plugins: [
		organization(),
		phoneNumber({
			sendOTP: (opts, _req) => {
				console.log("SENDING OTP: ", opts);
			},
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
