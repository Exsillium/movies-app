import useSWR from "swr";
import fetcher from "../../swr/fetcher";
import { useEffect } from "react";

/*
{
	avatar: {
		gravatar: { hash: "ed4768a1ed34dcb1b1b2f9a222608a05" },
		tmdb: { avatar_path: null },
	},
	id: 20523335,
	iso_639_1: "ar",
	iso_3166_1: "EG",
	name: "",
	include_adult: false,
	username: "waseem",
};
 */

export default function useAccountData(sessionId) {
	const { isLoading, error, data } = useSWR(
		sessionId && "account?session_id=" + sessionId,
		fetcher.get
	);
	return {
		isLoading,
		error: error,
		accountData: data,
	};
}
