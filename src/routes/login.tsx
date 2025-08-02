import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as v from "valibot";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { authClient } from "@/lib/auth-client";
import { m } from "@/paraglide/messages";

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
			const optResult = await authClient.phoneNumber.sendOtp({
				phoneNumber: value.phoneNumber,
			});

			if (optResult.error) {
				console.error("Sending OTP failed");
				return;
			}

			navigate({
				to: "/verify",
				search: { phone: value.phoneNumber },
			});
		},
		validators: {
			onChange: LoginSchema,
		},
	});

	return (
		<div
			className="flex flex-col items-center p-0 justify-center min-h-screen  md:p-4"
			dir="rtl"
		>
			<div className="w-full max-w-md bg-white p-5 md:p-10 rounded-2xl md:shadow-sm md:border border-gray-200 flex flex-col gap-16">
				<div className="text-center flex flex-col justify-between gap-24 items-center">
					<img
						src="assets/icons/edited-image.png"
						alt="brand-logo"
						width={180}
						height={180}
					/>
					<div>
						<h2 className="text-2xl font-bold text-gray-800 mb-3">
							{m.login_page_title()}
						</h2>
						<p className="text-gray-500 text-sm">
							{m.login_page_description()}
						</p>
					</div>
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
									{m.login_phone_number()}
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
									<InputBase
										type="tel"
										placeholder={m.login_page_example_phone_number()}
									/>
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
								{isSubmitting
									? m.login_page_sending()
									: m.login_page_send_code()}
							</Button>
						)}
					/>
				</form>
			</div>
		</div>
	);
}

const LoginSchema = v.object({
	phoneNumber: v.pipe(
		v.string(),
		v.regex(/^(\+98|0)?9\d{9}$/, m.login_page_phone_number_error()),
	),
});
