import useSWR from "swr";
import fetcher from "../../../swr/fetcher";

export default function useUpcomingMovies() {
	const { data, error, isLoading } = useSWR("/movie/upcoming", fetcher.get);

	return { isLoading, error, upcomingMovies: data?.results };
}
