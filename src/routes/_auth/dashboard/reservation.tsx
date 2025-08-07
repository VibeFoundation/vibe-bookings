import { createFileRoute } from "@tanstack/react-router";
import type { SVGProps } from "react";
import { useState } from "react";
import { m } from "@/paraglide/messages";

// === TYPESCRIPT INTERFACES ===
interface Appointment {
	id: number;
	client: {
		name: string;
		avatar: string;
	};
	service: string;
	staff: string;
	dateTime: string;
	status: "تایید شده" | "تکمیل شده" | "لغو شده";
}

// === MOCK DATA ===
const mockAppointments: Appointment[] = [
	{
		id: 1,
		client: { name: "سارا احمدی", avatar: "س" },
		service: "کاشت ناخن",
		staff: "مریم رضایی",
		dateTime: "۱۴۰۳/۰۴/۲۵ - ۱۱:۰۰",
		status: "تایید شده",
	},
	{
		id: 2,
		client: { name: "زهرا حسینی", avatar: "ز" },
		service: "رنگ و مش",
		staff: "شیما کریمی",
		dateTime: "۱۴۰۳/۰۴/۲۵ - ۱۳:۳۰",
		status: "تایید شده",
	},
	{
		id: 3,
		client: { name: "فاطمه محمدی", avatar: "ف" },
		service: "اصلاح و ابرو",
		staff: "نگار جعفری",
		dateTime: "۱۴۰۳/۰۴/۲۴ - ۱۸:۰۰",
		status: "تکمیل شده",
	},
	{
		id: 4,
		client: { name: "هانیه مرادی", avatar: "ه" },
		service: "میکاپ صورت",
		staff: "مریم رضایی",
		dateTime: "۱۴۰۳/۰۴/۲۴ - ۱۶:۴۵",
		status: "تکمیل شده",
	},
	{
		id: 5,
		client: { name: "نیلوفر قاسمی", avatar: "ن" },
		service: "کراتین مو",
		staff: "شیما کریمی",
		dateTime: "۱۴۰۳/۰۴/۲۳ - ۱۰:۰۰",
		status: "لغو شده",
	},
	{
		id: 6,
		client: { name: "الهام عزیزی", avatar: "ا" },
		service: "پدیکور",
		staff: "نگار جعفری",
		dateTime: "۱۴۰۳/۰۴/۲۶ - ۱۷:۰۰",
		status: "تایید شده",
	},
];

// === HELPER COMPONENTS ===
const StatusBadge = ({ status }: { status: Appointment["status"] }) => {
	const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
	const statusClasses = {
		"تایید شده": "bg-green-100 text-green-800",
		"تکمیل شده": "bg-gray-200 text-gray-800",
		"لغو شده": "bg-red-100 text-red-800",
	};
	return (
		<span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
	);
};

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="11" cy="11" r="8"></circle>
		<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
	</svg>
);

const PlusCircleIcon = (props: SVGProps<SVGSVGElement>) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="10"></circle>
		<line x1="12" y1="8" x2="12" y2="16"></line>
		<line x1="8" y1="12" x2="16" y2="12"></line>
	</svg>
);

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
		<line x1="16" y1="2" x2="16" y2="6"></line>
		<line x1="8" y1="2" x2="8" y2="6"></line>
		<line x1="3" y1="10" x2="21" y2="10"></line>
	</svg>
);

const ScissorsIcon = (props: SVGProps<SVGSVGElement>) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="6" cy="6" r="3"></circle>
		<circle cx="6" cy="18" r="3"></circle>
		<line x1="20" y1="4" x2="8.12" y2="15.88"></line>
		<line x1="14.47" y1="14.48" x2="20" y2="20"></line>
		<line x1="8.12" y1="8.12" x2="12" y2="12"></line>
	</svg>
);

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
		<circle cx="12" cy="7" r="4"></circle>
	</svg>
);

export const Route = createFileRoute("/_auth/dashboard/reservation")({
	context: () => {
		return { title: () => m.reservation() };
	},
	component: BookedAppointments,
});

function BookedAppointments() {
	const [appointments, _setAppointments] =
		useState<Appointment[]>(mockAppointments);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredAppointments = appointments.filter((appt) =>
		appt.client.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div
			className="p-4 md:p-6 lg:p-8 bg-[#FAFAFA] min-h-screen"
			style={{ fontFamily: "Vazirmatn, sans-serif" }}
		>
			<div className="max-w-7xl mx-auto">
				{/* Page Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
					<h1 className="text-2xl md:text-3xl font-bold text-[#333333]">
						مدیریت نوبت‌ها
					</h1>
					<button
						type="button"
						className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-[#B799FF] text-white rounded-lg shadow-md hover:bg-[#a379ff] transition-colors duration-300"
					>
						<PlusCircleIcon className="w-5 h-5" />
						<span>افزودن نوبت جدید</span>
					</button>
				</div>

				{/* Filters and Search Bar */}
				<div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="relative md:col-span-2">
							<input
								type="text"
								placeholder="جستجوی مشتری..."
								className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E6DAFA] focus:border-[#B799FF] outline-none transition"
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						</div>
						<select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#E6DAFA] focus:border-[#B799FF] outline-none transition">
							<option>همه وضعیت‌ها</option>
							<option>تایید شده</option>
							<option>تکمیل شده</option>
							<option>لغو شده</option>
						</select>
						<select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#E6DAFA] focus:border-[#B799FF] outline-none transition">
							<option>همه تاریخ‌ها</option>
							<option>امروز</option>
							<option>این هفته</option>
							<option>این ماه</option>
						</select>
					</div>
				</div>

				{/* Appointments List - Desktop Table View */}
				<div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
					<div className="overflow-x-auto">
						<table className="w-full text-right">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="p-4 text-sm font-bold text-gray-600">مشتری</th>
									<th className="p-4 text-sm font-bold text-gray-600">سرویس</th>
									<th className="p-4 text-sm font-bold text-gray-600 hidden lg:table-cell">
										پرسنل
									</th>
									<th className="p-4 text-sm font-bold text-gray-600">
										تاریخ و ساعت
									</th>
									<th className="p-4 text-sm font-bold text-gray-600">وضعیت</th>
									<th className="p-4 text-sm font-bold text-gray-600">
										اقدامات
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredAppointments.map((appt) => (
									<tr
										key={appt.id}
										className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
									>
										<td className="p-4 whitespace-nowrap">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-[#E6DAFA] text-[#B799FF] flex items-center justify-center font-bold">
													{appt.client.avatar}
												</div>
												<p className="font-semibold text-gray-800">
													{appt.client.name}
												</p>
											</div>
										</td>
										<td className="p-4 whitespace-nowrap text-gray-600">
											{appt.service}
										</td>
										<td className="p-4 whitespace-nowrap text-gray-600 hidden lg:table-cell">
											{appt.staff}
										</td>
										<td className="p-4 whitespace-nowrap text-gray-600">
											{appt.dateTime}
										</td>
										<td className="p-4 whitespace-nowrap">
											<StatusBadge status={appt.status} />
										</td>
										<td className="p-4 whitespace-nowrap">
											{/** biome-ignore lint/a11y/useButtonType: <explanation> */}
											<button className="text-gray-500 hover:text-[#B799FF]">
												{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<circle cx="12" cy="12" r="1"></circle>
													<circle cx="12" cy="5" r="1"></circle>
													<circle cx="12" cy="19" r="1"></circle>
												</svg>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Appointments List - Mobile Card View */}
				<div className="md:hidden space-y-4">
					{filteredAppointments.map((appt) => (
						<div
							key={appt.id}
							className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
						>
							<div className="flex justify-between items-start">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-[#E6DAFA] text-[#B799FF] flex items-center justify-center font-bold shrink-0">
										{appt.client.avatar}
									</div>
									<div>
										<p className="font-bold text-gray-800">
											{appt.client.name}
										</p>
										<StatusBadge status={appt.status} />
									</div>
								</div>
								{/** biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button className="text-gray-500 hover:text-[#B799FF]">
									{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="12" cy="12" r="1"></circle>
										<circle cx="12" cy="5" r="1"></circle>
										<circle cx="12" cy="19" r="1"></circle>
									</svg>
								</button>
							</div>
							<div className="border-t my-3"></div>
							<div className="space-y-2 text-sm text-gray-600">
								<div className="flex items-center gap-2">
									<ScissorsIcon className="w-4 h-4 text-gray-400" />
									<span>
										<strong>سرویس:</strong> {appt.service}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<UserIcon className="w-4 h-4 text-gray-400" />
									<span>
										<strong>پرسنل:</strong> {appt.staff}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<CalendarIcon className="w-4 h-4 text-gray-400" />
									<span>
										<strong>زمان:</strong> {appt.dateTime}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{filteredAppointments.length === 0 && (
					<div className="text-center py-10 bg-white rounded-xl mt-6">
						<p className="text-gray-500">هیچ نوبتی یافت نشد.</p>
					</div>
				)}
			</div>
		</div>
	);
}
