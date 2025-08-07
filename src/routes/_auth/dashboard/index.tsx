import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/_auth/dashboard/")({
	context: () => {
		return { title: () => m.dashboard() };
	},
	component: RouteComponent,
});

const appointmentsData = [
	{ id: 1, name: "سارا احمدی", time: "14:30", service: "کاشت ناخن" },
	{ id: 2, name: "مریم رضایی", time: "16:00", service: "رنگ مو" },
	{ id: 3, name: "فاطمه کریمی", time: "17:30", service: "اصلاح صورت" },
];
const staffData = [
	{ id: 1, name: "الهام", avatarChar: "ا" },
	{ id: 2, name: "زهرا", avatarChar: "ز" },
	{ id: 3, name: "نگار", avatarChar: "ن" },
];

function RouteComponent() {
	return (
		<DashboardPage />
		// <div>
		// 	<main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
		// 		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
		// 			<div className="bg-white p-5 rounded-xl border border-gray-200">
		// 				<h3 className="text-gray-500 text-sm font-medium">درآمد امروز</h3>
		// 				<p className="text-2xl font-bold text-gray-800 mt-2">
		// 					۱,۲۵۰,۰۰۰{" "}
		// 					<span className="text-base font-medium text-gray-500">تومان</span>
		// 				</p>
		// 			</div>
		// 			<div className="bg-white p-5 rounded-xl border border-gray-200">
		// 				<h3 className="text-gray-500 text-sm font-medium">نوبت‌های امروز</h3>
		// 				<p className="text-2xl font-bold text-gray-800 mt-2">۱۲</p>
		// 			</div>
		// 			<div className="bg-white p-5 rounded-xl border border-gray-200">
		// 				<h3 className="text-gray-500 text-sm font-medium">مشتریان کل</h3>
		// 				<p className="text-2xl font-bold text-gray-800 mt-2">۱۴۲</p>
		// 			</div>
		// 			<div className="bg-purple-100 text-purple-700 p-5 rounded-xl">
		// 				<h3 className="font-medium text-sm">کارکنان فعال</h3>
		// 				<div className="flex items-center -space-x-2 mt-2">
		// 					{staffData.map((s) => (
		// 						<img
		// 							key={s.id}
		// 							src={`https://placehold.co/40x40/a78bfa/FFFFFF?text=${s.avatarChar}`}
		// 							alt={s.name}
		// 							className="w-10 h-10 rounded-full border-2 border-white"
		// 						/>
		// 					))}
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
		// 			<div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
		// 				<div className="flex justify-between items-center mb-4">
		// 					<h3 className="text-lg font-bold text-gray-800">نوبت‌های آتی</h3>
		// 					<a
		// 						href="#a"
		// 						className="text-sm font-semibold text-purple-500 hover:underline"
		// 					>
		// 						مشاهده همه
		// 					</a>
		// 				</div>
		// 				<div className="space-y-4">
		// 					{appointmentsData.map((app) => (
		// 						<div
		// 							key={app.id}
		// 							className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
		// 						>
		// 							<div className="flex items-center gap-4">
		// 								<img
		// 									src={`https://placehold.co/40x40/ddd6fe/4B5563?text=${app.name.charAt(0)}`}
		// 									alt="avatar"
		// 									className="w-10 h-10 rounded-full"
		// 								/>
		// 								<div>
		// 									<p className="font-bold text-gray-800">{app.name}</p>
		// 									<p className="text-sm text-gray-500">{app.service}</p>
		// 								</div>
		// 							</div>
		// 							<p className="text-sm font-semibold text-gray-600">
		// 								{app.time}
		// 							</p>
		// 						</div>
		// 					))}
		// 				</div>
		// 			</div>
		// 			<div className="bg-white p-6 rounded-xl border border-gray-200">
		// 				<h3 className="text-lg font-bold text-gray-800 mb-4">
		// 					اقدامات سریع
		// 				</h3>
		// 				<div className="space-y-3">
		// 					<button
		// 						type="button"
		// 						className="w-full text-right bg-purple-500 text-white font-semibold p-4 rounded-lg hover:bg-purple-600 transition-colors"
		// 					>
		// 						افزودن نوبت جدید
		// 					</button>
		// 					<button
		// 						type="button"
		// 						className="w-full text-right bg-gray-100 text-gray-700 font-semibold p-4 rounded-lg hover:bg-gray-200 transition-colors"
		// 					>
		// 						مدیریت خدمات
		// 					</button>
		// 					<button
		// 						type="button"
		// 						className="w-full text-right bg-gray-100 text-gray-700 font-semibold p-4 rounded-lg hover:bg-gray-200 transition-colors"
		// 					>
		// 						ثبت مشتری جدید
		// 					</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</main>
		// </div>
	);
}

interface StatCardProps {
	title: string;
	value: string;
	trend?: string;
	icon: React.ReactNode;
	color: "violet" | "green" | "blue" | "amber";
}

interface AppointmentTimelineItemProps {
	time: string;
	customer: string;
	service: string;
	staffAvatar: string;
}

interface QuickActionButtonProps {
	children: React.ReactNode;
	primary?: boolean;
}

const TrendingUpIcon: React.FC = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="h-5 w-5"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="2"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-1.06-1.06m1.06 1.06l-2.28 2.28"
		/>
	</svg>
);

const CustomersIcon: React.FC = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.12-.241.252-.477.388-.702m-8.841 4.544a12.318 12.318 0 008.841-4.544m-8.841 4.544L6.375 18m6.375 3.125c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12c0 1.223-.185 2.401-.52 3.5"
		/>
	</svg>
);

const ServicesIcon: React.FC = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.386 1.62a15.998 15.998 0 00-1.622-3.385m0 0a3 3 0 10-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 00-3.388-1.62m5.043-.025a15.998 15.998 0 01-1.622 3.385m-5.043.025a15.998 15.998 0 01-1.622 3.385m-3.386 1.62a15.998 15.998 0 011.622-3.385"
		/>
	</svg>
);

const AppointmentsIcon: React.FC = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5"
		/>
	</svg>
);

const WalletIcon: React.FC = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v6"
		/>
	</svg>
);

const DashboardPage: React.FC = () => {
	const StatCard: React.FC<StatCardProps> = ({
		title,
		value,
		trend,
		icon,
		color,
	}) => {
		const colors = {
			violet: {
				bg: "bg-violet-50",
				iconBg: "bg-violet-100",
				iconText: "text-violet-600",
				trendText: "text-violet-700",
			},
			green: {
				bg: "bg-green-50",
				iconBg: "bg-green-100",
				iconText: "text-green-600",
				trendText: "text-green-700",
			},
			blue: {
				bg: "bg-blue-50",
				iconBg: "bg-blue-100",
				iconText: "text-blue-600",
				trendText: "text-blue-700",
			},
			amber: {
				bg: "bg-amber-50",
				iconBg: "bg-amber-100",
				iconText: "text-amber-600",
				trendText: "text-amber-700",
			},
		};
		const selectedColor = colors[color] || colors.violet;

		return (
			<div className={`flex-1 rounded-xl p-5 ${selectedColor.bg}`}>
				<div
					className={`flex h-12 w-12 items-center justify-center rounded-lg ${selectedColor.iconBg}`}
				>
					{/* {React.cloneElement(icon as React.ReactElement, {
						className: `h-6 w-6 ${selectedColor.iconText}`,
					})} */}
				</div>
				<h3 className="mt-4 text-sm font-medium text-gray-500">{title}</h3>
				<p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
				{trend && (
					<p
						className={`mt-2 flex items-center gap-1 text-sm font-medium ${selectedColor.trendText}`}
					>
						<TrendingUpIcon /> {trend}
					</p>
				)}
			</div>
		);
	};

	const AppointmentTimelineItem: React.FC<AppointmentTimelineItemProps> = ({
		time,
		customer,
		service,
		staffAvatar,
	}) => (
		<li className="flex gap-4">
			<div className="flex flex-col items-center">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
					{time.split(":")[0]}
				</div>
				<div className="h-full w-px bg-gray-200"></div>
			</div>
			<div className="flex-1 rounded-lg border border-gray-200 bg-white p-4 mb-4 hover:shadow-md transition-shadow">
				<div className="flex items-center justify-between">
					<div>
						<p className="font-semibold text-gray-800">{service}</p>
						<p className="text-sm text-gray-500">مشتری: {customer}</p>
					</div>
					<img
						className="h-10 w-10 rounded-full"
						src={staffAvatar}
						alt="staff"
					/>
				</div>
			</div>
		</li>
	);

	const QuickActionButton: React.FC<QuickActionButtonProps> = ({
		children,
		primary,
	}) => (
		<button
			type="button"
			className={`w-full rounded-lg p-4 text-center font-semibold shadow-sm transition-colors
            ${primary ? "bg-violet-600 text-white hover:bg-violet-700" : "bg-white text-gray-700 hover:bg-gray-100"}`}
		>
			{children}
		</button>
	);

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">سلام، Olivia!</h1>
					<p className="mt-1 text-sm text-gray-500">
						امروز پنج‌شنبه، ۱۶ مرداد ۱۴۰۴ است.
					</p>
				</div>
				<button
					type="button"
					className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 sm:w-auto"
				>
					+ افزودن نوبت
				</button>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="درآمد امروز"
					value="۱,۲۵۰,۰۰۰ ت"
					trend="+۱۲٪"
					icon={<WalletIcon />}
					color="green"
				/>
				<StatCard
					title="نوبت‌های امروز"
					value="۱۲"
					trend="+۳ نوبت"
					icon={<AppointmentsIcon />}
					color="violet"
				/>
				<StatCard
					title="مشتریان جدید"
					value="۳"
					trend="+۱"
					icon={<CustomersIcon />}
					color="blue"
				/>
				<StatCard
					title="سرویس محبوب"
					value="کاشت ناخن"
					icon={<ServicesIcon />}
					color="amber"
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
					<h2 className="text-lg font-bold text-gray-900">نوبت‌های امروز</h2>
					<ul className="mt-4">
						<AppointmentTimelineItem
							time="10:00"
							customer="سارا احمدی"
							service="کاشت ناخن"
							staffAvatar="https://placehold.co/40x40/E9D8FD/6D28D9?text=SA"
						/>
						<AppointmentTimelineItem
							time="11:30"
							customer="مریم رضایی"
							service="رنگ مو"
							staffAvatar="https://placehold.co/40x40/D1FAE5/065F46?text=MR"
						/>
						<AppointmentTimelineItem
							time="14:00"
							customer="فاطمه کریمی"
							service="اصلاح صورت"
							staffAvatar="https://placehold.co/40x40/FEE2E2/991B1B?text=FK"
						/>
					</ul>
				</div>
				<div className="space-y-6">
					<div className="rounded-xl bg-violet-50 p-6">
						<h2 className="text-lg font-bold text-gray-900">اقدامات سریع</h2>
						<div className="mt-4 space-y-3">
							<QuickActionButton primary>افزودن نوبت جدید</QuickActionButton>
							<QuickActionButton>ثبت مشتری جدید</QuickActionButton>
						</div>
					</div>
					<div className="rounded-xl bg-white p-6 shadow-sm">
						<h2 className="text-lg font-bold text-gray-900">کارکنان فعال</h2>
						<div className="mt-4 flex -space-x-2 overflow-hidden">
							<img
								className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
								src="https://placehold.co/128x128/E9D8FD/6D28D9?text=SA"
								alt="سارا احمدی"
							/>
							<img
								className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
								src="https://placehold.co/128x128/D1FAE5/065F46?text=MR"
								alt="مریم رضایی"
							/>
							<img
								className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
								src="https://placehold.co/128x128/FEE2E2/991B1B?text=ZH"
								alt="زهرا حسینی"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
