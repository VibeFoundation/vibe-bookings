import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	const navigate = useNavigate({ from: Route.fullPath });
	const loginForm = useForm({
		defaultValues: {
			phoneNumber: "",
		},
		onSubmit: async ({ value }) => {
			// In a real app, you'd call an API to send the code
			console.log("Sending code to:", value.phoneNumber);
			authClient.phoneNumber.sendOtp({ phoneNumber: value.phoneNumber });
			navigate({
				to: "/verify",
				search: { phone: value.phoneNumber },
			});
		},
		validators: {
			onChange: z.object({
				phoneNumber: z
					.string()
					.regex(/^(\+98|0)?9\d{9}$/, "شماره صحیح وارد کن"),
			}),
		},
	});
	return (
		<div
			className="flex flex-col items-center p-0 justify-center min-h-screen  md:p-4"
			dir="rtl"
		>
			<div className="w-full max-w-md bg-white p-5 md:p-10 rounded-2xl md:shadow-sm md:border border-gray-200">
				<div className="flex justify-center mb-8"></div>
				<div className="text-center flex flex-col items-center gap-4 pb-8">
					<h2 className="text-2xl font-bold text-gray-800">ورود | ثبت‌نام</h2>
					<p className="text-gray-500 text-sm">
						برای دریافت کد تایید، شماره موبایل خود را وارد کنید.
					</p>
					<img
						src="src/assets/icons/edited-image.png"
						alt="brand-logo"
						width={180}
						height={180}
					/>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						loginForm.handleSubmit();
					}}
				>
					<loginForm.Field
						name="phoneNumber"
						// biome-ignore lint/correctness/noChildrenProp: <explanation>
						children={(field) => (
							<div className="mb-4">
								<label htmlFor={field.name} className="sr-only">
									شماره موبایل
								</label>
								<InputGroup
									isRequired
									hint={field.state.meta.errors.at(0)?.message}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={field.handleChange}
									isInvalid={!!field.state.meta.errors?.length}
								>
									<InputBase type="tel" placeholder="مثال: 09123456789" />
								</InputGroup>
							</div>
						)}
					/>
					<loginForm.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						// biome-ignore lint/correctness/noChildrenProp: <explanation>
						children={([canSubmit, isSubmitting]) => (
							<Button
								className="w-full"
								color="primary"
								size="md"
								type="submit"
								disabled={!canSubmit || isSubmitting}
							>
								{isSubmitting ? "در حال ارسال..." : "ارسال کد"}
							</Button>
						)}
					/>
				</form>
			</div>
		</div>
	);
}
