import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/")({
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
		<div>
			<main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
					<div className="bg-white p-5 rounded-xl border border-gray-200">
						<h3 className="text-gray-500 text-sm font-medium">درآمد امروز</h3>
						<p className="text-2xl font-bold text-gray-800 mt-2">
							۱,۲۵۰,۰۰۰{" "}
							<span className="text-base font-medium text-gray-500">تومان</span>
						</p>
					</div>
					<div className="bg-white p-5 rounded-xl border border-gray-200">
						<h3 className="text-gray-500 text-sm font-medium">نوبت‌های امروز</h3>
						<p className="text-2xl font-bold text-gray-800 mt-2">۱۲</p>
					</div>
					<div className="bg-white p-5 rounded-xl border border-gray-200">
						<h3 className="text-gray-500 text-sm font-medium">مشتریان کل</h3>
						<p className="text-2xl font-bold text-gray-800 mt-2">۱۴۲</p>
					</div>
					<div className="bg-purple-100 text-purple-700 p-5 rounded-xl">
						<h3 className="font-medium text-sm">کارکنان فعال</h3>
						<div className="flex items-center -space-x-2 mt-2">
							{staffData.map((s) => (
								<img
									key={s.id}
									src={`https://placehold.co/40x40/a78bfa/FFFFFF?text=${s.avatarChar}`}
									alt={s.name}
									className="w-10 h-10 rounded-full border-2 border-white"
								/>
							))}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-bold text-gray-800">نوبت‌های آتی</h3>
							<a
								href="#a"
								className="text-sm font-semibold text-purple-500 hover:underline"
							>
								مشاهده همه
							</a>
						</div>
						<div className="space-y-4">
							{appointmentsData.map((app) => (
								<div
									key={app.id}
									className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
								>
									<div className="flex items-center gap-4">
										<img
											src={`https://placehold.co/40x40/ddd6fe/4B5563?text=${app.name.charAt(0)}`}
											alt="avatar"
											className="w-10 h-10 rounded-full"
										/>
										<div>
											<p className="font-bold text-gray-800">{app.name}</p>
											<p className="text-sm text-gray-500">{app.service}</p>
										</div>
									</div>
									<p className="text-sm font-semibold text-gray-600">
										{app.time}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="bg-white p-6 rounded-xl border border-gray-200">
						<h3 className="text-lg font-bold text-gray-800 mb-4">
							اقدامات سریع
						</h3>
						<div className="space-y-3">
							<button
								type="button"
								className="w-full text-right bg-purple-500 text-white font-semibold p-4 rounded-lg hover:bg-purple-600 transition-colors"
							>
								افزودن نوبت جدید
							</button>
							<button
								type="button"
								className="w-full text-right bg-gray-100 text-gray-700 font-semibold p-4 rounded-lg hover:bg-gray-200 transition-colors"
							>
								مدیریت خدمات
							</button>
							<button
								type="button"
								className="w-full text-right bg-gray-100 text-gray-700 font-semibold p-4 rounded-lg hover:bg-gray-200 transition-colors"
							>
								ثبت مشتری جدید
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
