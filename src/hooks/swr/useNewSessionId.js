import useSWR from "swr";
import fetcher from "../../swr/fetcher";

/*
{success: true, session_id: '1f63589de040ba5ad2f65579198e64659ef7f399'}
*/

export default function useNewSessionId(token) {
	const { isLoading, error, data } = useSWR(
		token && "authentication/session/new",
		(url) => fetcher.post(url, { request_token: token })
	);

	return {
		isLoading,
		error: data?.success && error,
		sessionId: data?.session_id,
	};
}
