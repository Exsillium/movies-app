import useSWR from "swr";
import fetcher from "../../swr/fetcher";

// https://api.themoviedb.org/3/authentication/token/new
/*
{
	"success": true,
	"expires_at": "2025-05-26 02:21:13 UTC",
	"request_token": "ecdf0f94690e611238a9150109c1d57412b67509"
}
*/

export default function useNewToken() {
	const { isLoading, error, data } = useSWR(
		"authentication/token/new",
		fetcher.get
	);
	return { isLoading, error, token: data?.request_token };
}
