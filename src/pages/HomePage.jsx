import { useSelector } from "react-redux";
import useAccountData from "../hooks/swr/useAccountData";
import useNewSessionId from "../hooks/swr/useNewSessionId";

export default function HomePage() {
	const sessionId = useSelector((state) => state.sessionId);
	const { accountData, isLoading, error } = useAccountData(sessionId);
	return (
		<div>
			<h1>HomePage</h1>
			<hr />
			<div>
				<div>AccountData</div>
				<div>data:{JSON.stringify(accountData || {})}</div>
				<div>isLoading:{isLoading}</div>
				<div>error:{error}</div>
			</div>
			<hr />
		</div>
	);
}
