import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState as ReactState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { authClient } from "@/lib/auth-client";
import { m } from "@/paraglide/messages";

const verifySearchSchema = z.object({
	phone: z.string().catch(""),
});

export const Route = createFileRoute("/verify")({
	validateSearch: verifySearchSchema,
	component: VerifyComponent,
});

function VerifyComponent() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const phone = verifySearchSchema.parse(search).phone;
	const [timer, setTimer] = ReactState(59);

	if (!search.phone) {
		navigate({ to: "/login" });
	}

	useEffect(() => {
		if (timer === 0) return;
		const intervalId = setInterval(() => setTimer((prev) => prev - 1), 1000);
		return () => clearInterval(intervalId);
	}, [timer]);

	const formVerify = useForm({
		defaultValues: {
			otp: "",
		},
		onSubmit: async ({ value }) => {
			const res = await authClient.phoneNumber.verify({
				code: value.otp,
				phoneNumber: phone,
			});

			if (res.data) {
				navigate({ to: "/dashboard" });
				return;
			}

			const errorCode = res.error.code;
			if (errorCode && errorCode in VERIFY_ERROR_MESSAGE) {
				toast.error(
					VERIFY_ERROR_MESSAGE[
						errorCode as keyof typeof VERIFY_ERROR_MESSAGE
					](),
				);
			}
		},
		validators: {
			onChange: z.object({
				otp: z.string().min(6, m.verify_page_code_error()),
			}),
		},
	});

	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen md:p-4"
			dir="rtl"
		>
			<div className="w-full max-w-md bg-white p-5 md:p-10 rounded-2xl md:shadow-sm md:border border-gray-200">
				<div className="flex justify-center mb-8"></div>
				<div className="text-center">
					<h2 className="text-xl font-bold text-gray-800 mb-2">
						{m.verify_page_title()}
					</h2>
					<p className="text-gray-500 text-sm mb-8">
						{/* <span className="font-semibold text-gray-800">{phone}</span> */}
						{m.verify_page_code_sended({ phoneNumber: phone })}
					</p>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						formVerify.handleSubmit();
					}}
				>
					<formVerify.Field
						name="otp"
						// biome-ignore lint/correctness/noChildrenProp: <explanation>
						children={(field) => (
							<div className="mb-6">
								<Input
									isRequired
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={field.handleChange}
									type="text"
									maxLength={6}
									isInvalid={!field.state.meta.isValid}
									hint={field.state.meta.errors.at(0)?.message}
									placeholder="----"
									className={`w-full ${!field.state.meta.isValid ? `focus:ring-2 focus:ring-red-200 focus:border-red-400` : `focus:ring-2 focus:ring-purple-200 focus:border-purple-400`}`}
								/>
							</div>
						)}
					/>
					<div className="text-center text-sm text-gray-500 mb-6">
						{timer > 0 ? (
							<span>
								{m.verify_page_resend_code_to()}
								{timer < 10 ? "0${timer}" : timer}
							</span>
						) : (
							<button
								type="button"
								onClick={() => setTimer(59)}
								className="font-semibold text-purple-500 hover:underline"
							>
								{m.verify_page_resend_code()}
							</button>
						)}
					</div>
					<formVerify.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								color="primary"
								size="md"
								disabled={!canSubmit || isSubmitting}
								className="w-full"
							>
								{isSubmitting
									? m.verify_page_in_review()
									: m.verify_page_confirm()}
							</Button>
						)}
					</formVerify.Subscribe>
				</form>
			</div>
			<Toaster richColors position="top-center" />
		</div>
	);
}

const VERIFY_ERROR_MESSAGE = {
	INVALID_OTP: m.verify_page_wrong_otp,
};
