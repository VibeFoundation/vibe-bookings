import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState as ReactState, useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { authClient } from "@/lib/auth-client";

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
			authClient.phoneNumber.verify({ code: value.otp, phoneNumber: phone });
			navigate({ to: "/dashboard" });
		},
		validators: {
			onChange: z.object({
				otp: z.string().min(4, "کد باید ۴ رقم باشد."),
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
						کد تایید را وارد کنید
					</h2>
					<p className="text-gray-500 text-sm mb-8">
						کد به شماره{" "}
						<span className="font-semibold text-gray-800">{phone}</span> ارسال
						شد.
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
									maxLength={4}
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
								ارسال مجدد کد تا 00:{timer < 10 ? "0${timer}" : timer}
							</span>
						) : (
							<button
								type="button"
								onClick={() => setTimer(59)}
								className="font-semibold text-purple-500 hover:underline"
							>
								ارسال مجدد کد
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
								{isSubmitting ? "در حال بررسی..." : "تایید"}
							</Button>
						)}
					</formVerify.Subscribe>
				</form>
			</div>
		</div>
	);
}
