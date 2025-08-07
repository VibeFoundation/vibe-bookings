interface StatCardProps {
	title: string;
	value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
	return (
		<div className="flex-1 rounded-xl border w-36 h-36 xs:w-full xs:h-full border-gray-200 bg-white p-5 shadow-sm">
			<h3 className="text-sm font-medium text-gray-500">{title}</h3>
			<div className="mt-2 flex items-baseline gap-2">
				<p className="text-3xl font-bold text-gray-900">{value}</p>
			</div>
		</div>
	);
}
