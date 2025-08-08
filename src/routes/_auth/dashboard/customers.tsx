import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/base/input/input";
import { m } from "@/paraglide/messages";

interface Customer {
	id: number;
	name: string;
	email: string;
	avatar: string;
	totalAppointments: number;
	lastVisit: string;
}

const ChevronLeftIcon: React.FC = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="h-5 w-5"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={2}
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 19.5L8.25 12l7.5-7.5"
		/>
	</svg>
);

const SearchIcon: React.FC = () => (
	<svg
		className="h-5 w-12 text-gray-400"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
			clipRule="evenodd"
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

const ChevronRightIcon: React.FC = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="h-5 w-5"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={2}
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8.25 4.5l7.5 7.5-7.5 7.5"
		/>
	</svg>
);

export const Route = createFileRoute("/_auth/dashboard/customers")({
	context: () => {
		return { title: () => m.Customers() };
	},
	component: Customers,
});

function Customers() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const CustomerStatCard: React.FC<{
		title: string;
		value: string;
		icon: React.ReactNode;
	}> = ({ title, value, icon }) => (
		<div className="flex-1 rounded-xl bg-white p-5 shadow-sm flex items-center gap-4">
			<div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-violet-100 text-violet-600">
				{icon}
			</div>
			<div>
				<h3 className="text-sm font-medium text-gray-500">{title}</h3>
				<p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
			</div>
		</div>
	);

	const allCustomers: Customer[] = useMemo(
		() => [
			{
				id: 1,
				name: "سارا احمدی",
				email: "sara.a@example.com",
				avatar: "https://placehold.co/40x40/E9D8FD/6D28D9?text=SA",
				totalAppointments: 12,
				lastVisit: "۱۴۰۴/۰۴/۱۵",
			},
			{
				id: 2,
				name: "مریم رضایی",
				email: "maryam.r@example.com",
				avatar: "https://placehold.co/40x40/D1FAE5/065F46?text=MR",
				totalAppointments: 8,
				lastVisit: "۱۴۰۴/۰۴/۱۰",
			},
			{
				id: 3,
				name: "علی کریمی",
				email: "ali.k@example.com",
				avatar: "https://placehold.co/40x40/FEF3C7/92400E?text=AK",
				totalAppointments: 21,
				lastVisit: "۱۴۰۴/۰۵/۰۱",
			},
			{
				id: 4,
				name: "فاطمه محمدی",
				email: "fatemeh.m@example.com",
				avatar: "https://placehold.co/40x40/FEE2E2/991B1B?text=FM",
				totalAppointments: 5,
				lastVisit: "۱۴۰۴/۰۳/۲۰",
			},
			{
				id: 5,
				name: "رضا قاسمی",
				email: "reza.gh@example.com",
				avatar: "https://placehold.co/40x40/DBEAFE/1E40AF?text=RG",
				totalAppointments: 15,
				lastVisit: "۱۴۰۴/۰۴/۲۸",
			},
			{
				id: 6,
				name: "نگار حسینی",
				email: "negar.h@example.com",
				avatar: "https://placehold.co/40x40/FCE7F3/831843?text=NH",
				totalAppointments: 2,
				lastVisit: "۱۴۰۴/۰۵/۰۲",
			},
			{
				id: 7,
				name: "رامین رضوی",
				email: "ramin.r@example.com",
				avatar: "https://placehold.co/40x40/FCE7F3/831843?text=RR",
				totalAppointments: 2,
				lastVisit: "۱۴۰۴/۰۵/۰۸",
			},
		],
		[],
	);

	// Pagination state
	const [page, setPage] = useState(1);
	const pageSize = 4;
	const filteredCustomers = useMemo(() => {
		return allCustomers.filter(
			(customer) =>
				customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [allCustomers, searchTerm]);

	const totalResults = filteredCustomers.length;
	const totalPages = Math.ceil(totalResults / pageSize);
	const paginatedCustomers = useMemo(() => {
		const start = (page - 1) * pageSize;
		return filteredCustomers.slice(start, start + pageSize);
	}, [filteredCustomers, page]);

	return (
		<div className="space-y-6 flex flex-col h-full">
			<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">مشتریان</h1>
					<p className="mt-1 text-sm text-gray-500">
						لیست مشتریان خود را مشاهده و مدیریت کنید.
					</p>
				</div>
				<button
					type="button"
					className="w-full z-10 rounded-lg cursor-pointer bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 sm:w-auto"
				>
					+ افزودن مشتری جدید
				</button>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<CustomerStatCard
					title="تعداد کل مشتریان"
					value={allCustomers.length.toString()}
					icon={<CustomersIcon />}
				/>
				<CustomerStatCard
					title="مشتریان جدید (این ماه)"
					value="۱۲"
					icon={<CustomersIcon />}
				/>
				<CustomerStatCard
					title="مشتریان فعال"
					value="۱۱۵"
					icon={<CustomersIcon />}
				/>
			</div>

			<div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden h-full flex flex-col">
				<div className="p-4 sm:p-6 border-b border-gray-200">
					<Input
						label="جستجوی مشتری"
						placeholder="نام یا ایمیل مشتری را وارد کنید..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e)}
						icon={SearchIcon}
						size="md"
						className="w-80"
						inputClassName="ps-0"
						autoComplete="off"
					/>
				</div>

				{/* Desktop Table */}
				<div className="hidden md:block h-full">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="py-3.5 pr-6 text-right text-sm font-semibold text-gray-900"
								>
									نام مشتری
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
								>
									تعداد نوبت‌ها
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
								>
									آخرین بازدید
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">ویرایش</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{paginatedCustomers.map((customer) => (
								<tr key={customer.email} className="hover:bg-gray-50">
									<td className="whitespace-nowrap py-4 pr-6 text-sm">
										<div className="flex items-center">
											<div className="h-10 w-10 flex-shrink-0">
												<img
													className="h-10 w-10 rounded-full"
													src={customer.avatar}
													alt=""
												/>
											</div>
											<div className="mr-4">
												<div className="font-medium text-gray-900">
													{customer.name}
												</div>
												<div className="text-gray-500">{customer.email}</div>
											</div>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{customer.totalAppointments}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{customer.lastVisit}
									</td>
									<td className="relative whitespace-nowrap py-4 pl-6 pr-4 text-left text-sm font-medium">
										<a
											// biome-ignore lint/a11y/useValidAnchor: <explanation>
											href="#"
											className="text-violet-600 hover:text-violet-900"
										>
											ویرایش
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Mobile Cards */}
				<div className="md:hidden">
					<ul className="divide-y divide-gray-200">
						{paginatedCustomers.map((customer) => (
							<li key={customer.email} className="p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<img
											className="h-10 w-10 rounded-full"
											src={customer.avatar}
											alt=""
										/>
										<div>
											<p className="font-medium text-gray-900">
												{customer.name}
											</p>
											<p className="text-sm text-gray-500">{customer.email}</p>
										</div>
									</div>
									<a
										// biome-ignore lint/a11y/useValidAnchor: <explanation>
										href="#"
										className="text-violet-600 hover:text-violet-900 text-sm"
									>
										ویرایش
									</a>
								</div>
								<div className="mt-4 flex justify-between text-sm text-gray-500">
									<div>
										<p>تعداد نوبت‌ها</p>
										<p className="font-semibold text-gray-800">
											{customer.totalAppointments}
										</p>
									</div>
									<div className="text-left">
										<p>آخرین بازدید</p>
										<p className="font-semibold text-gray-800">
											{customer.lastVisit}
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
					{/* Mobile Pagination */}
					<div className="flex flex-1 justify-between sm:hidden">
						<button
							type="button"
							disabled={page === 1}
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
						>
							قبلی
						</button>
						<button
							type="button"
							disabled={page === totalPages}
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
							className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
						>
							بعدی
						</button>
					</div>
					{/* Desktop Pagination */}
					<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
						<div>
							<p className="text-sm flex gap-1 text-gray-700">
								نمایش
								<span className="font-medium">{(page - 1) * pageSize + 1}</span>
								تا
								<span className="font-medium">
									{Math.min(page * pageSize, totalResults)}
								</span>
								از <span className="font-medium">{totalResults}</span> نتیجه
							</p>
						</div>
						<div>
							<nav
								className="isolate inline-flex -space-x-px rounded-md shadow-sm"
								aria-label="Pagination"
							>
								<button
									type="button"
									disabled={page === totalPages}
									onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									className="relative inline-flex items-center rounded-r-md px-2 py-2 disabled:cursor-default cursor-pointer text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
								>
									<span className="sr-only">بعدی</span>
									<ChevronRightIcon aria-hidden="true" />
								</button>
								<span dir="ltr">
									{Array.from({ length: totalPages }, (_, i) => (
										<button
											key={`page${i + 1}`}
											type="button"
											onClick={() => setPage(i + 1)}
											aria-current={page === i + 1 ? "page" : undefined}
											className={`relative inline-flex items-center px-4 py-2 disabled:cursor-default cursor-pointer text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${page === i + 1 ? "z-10 bg-violet-600 text-white" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"}`}
										>
											{i + 1}
										</button>
									))}
								</span>
								<button
									type="button"
									disabled={page === 1}
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									className="relative inline-flex items-center cursor-pointer disabled:cursor-default rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
								>
									<span className="sr-only">قبلی</span>
									<ChevronLeftIcon aria-hidden="true" />
								</button>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
