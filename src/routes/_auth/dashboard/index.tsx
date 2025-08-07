import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Button } from "@/components/base/buttons/button";
import AppointmentItem from "@/features/dashboard/appointmentItem";
import StatCard from "@/features/dashboard/statCard";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/_auth/dashboard/")({
	context: () => {
		return { title: () => m.dashboard() };
	},
	component: Dashboard,
});

function Dashboard() {
	return (
		<div>
			<DashboardPage />
		</div>
	);
}

const DashboardPage: React.FC = () => {
	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<p className="mt-1 text-sm text-gray-500">پنج‌شنبه، ۱۶ مرداد ۱۴۰۴ .</p>
				</div>
			</div>

			<div className="flex flex-wrap gap-4  xs:w-full xs:h-full">
				<StatCard title="درآمد امروز" value="۱,۲۵۰,۰۰۰ ت" />
				<StatCard title="نوبت‌های امروز" value="۱۲" />
				<StatCard title="مشتریان جدید" value="۳" />
				<StatCard title="مشتریان کل" value="۳۰۰" />
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
					<h2 className="text-lg font-bold text-gray-900">نوبت‌های امروز</h2>
					<ul className="mt-4">
						<AppointmentItem
							time="10:00"
							customer="سارا احمدی"
							service="کاشت ناخن"
							avatar="https://placehold.co/40x40/E9D8FD/6D28D9?text=SA"
						/>
						<AppointmentItem
							time="11:30"
							customer="مریم رضایی"
							service="رنگ مو"
							avatar="https://placehold.co/40x40/D1FAE5/065F46?text=MR"
						/>
						<AppointmentItem
							time="14:00"
							customer="فاطمه کریمی"
							service="اصلاح صورت"
							avatar="https://placehold.co/40x40/FEE2E2/991B1B?text=FK"
						/>
					</ul>
				</div>
				<div className="space-y-6">
					<div className="rounded-xl bg-brand-hover p-6">
						<h2 className="text-lg font-bold text-gray-900">اقدامات سریع</h2>
						<div className="mt-4 space-y-3">
							<Button className="w-full" color="primary" size="xl">
								افزودن نوبت جدید
							</Button>
							<Button className="w-full" color="secondary" size="xl">
								ثبت مشتری جدید
							</Button>
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
