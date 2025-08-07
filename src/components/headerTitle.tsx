import { useRouterState } from "@tanstack/react-router";

function HeaderTitle() {
	const matches = useRouterState({ select: (s) => s.matches });
	const match = [...matches].reverse().find((d) => d.context.title);
	return (
		<div className="text-lg font-semibold text-gray-800">
			{match?.context.title()}
		</div>
	);
}

export default HeaderTitle;
