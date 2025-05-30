import { useNavigate, useSearchParams } from "react-router";
import useSessionId from "./swr/useNewSessionId";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSessionId } from "../store/slice/sessionId";
import useAccountData from "./swr/useAccountData";
import { updateAccountData } from "../store/slice/accountData";

export default function useAuthentication() {
	const [searchParams] = useSearchParams();
	const { sessionId, isLoading } = useSessionId(
		searchParams.get("approved") === "true" && searchParams.get("request_token")
	);
	const { isLoading: isDataLoading, accountData } = useAccountData(sessionId);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sessionIdState = useSelector((state) => state.sessionId);

	useEffect(() => {
		if (accountData) {
			dispatch(addSessionId(sessionId));

			dispatch(updateAccountData(accountData));
			navigate("/");
		}
		if (sessionIdState) {
			navigate("/");
		}
	}, [accountData]);

	return {
		isLoading: isLoading || isDataLoading,
		sessionId,
		approved: searchParams.get("approved") === "true",
	};
}
