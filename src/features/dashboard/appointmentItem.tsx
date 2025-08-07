export default function AppointmentItem({
	time,
	customer,
	service,
	avatar,
}: {
	time: string;
	customer: string;
	service: string;
	avatar: string;
}) {
	return (
		<div className="flex items-center gap-4 border-b border-gray-200 py-4 last:border-b-0">
			<span className="text-sm text-brand-secondary">{time}</span>
			<div className="flex-1 flex items-center gap-3">
				<img className="h-10 w-10 rounded-full" src={avatar} alt={customer} />
				<div>
					<p className="font-semibold text-gray-800">{customer}</p>
					<p className="text-sm text-gray-500">{service}</p>
				</div>
			</div>
		</div>
	);
}
