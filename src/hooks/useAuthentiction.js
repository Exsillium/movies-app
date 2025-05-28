import { useNavigate, useSearchParams } from "react-router";
import useSessionId from "./swr/useNewSessionId";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSessionId } from "../store/slice/sessionId";

// check for request_token in the query params
// if it exists, get the sessionId from the server
// if the sessionId exists, store it in localStorage
// if the sessionId exists in localStorage, navigate to /home
// if the sessionId does not exist, show the login button

export default function useAuthentication() {
	const [searchParams] = useSearchParams();
	const { sessionId, isLoading } = useSessionId(
		searchParams.get("approved") === "true" && searchParams.get("request_token")
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sessionIdState = useSelector((state) => state.sessionId);

	useEffect(() => {
		if (sessionId) {
			dispatch(addSessionId(sessionId));
			navigate("/");
		}
	}, [sessionId]);
	useEffect(() => {
		if (sessionIdState) {
			navigate("/");
		}
	}, []);

	return {
		isLoading,
		sessionId,
		approved: searchParams.get("approved") === "true",
	};
}
