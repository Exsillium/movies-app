import useSWR from "swr";
import fetcher from "../../../swr/fetcher";

export default function useTrendingTv() {
	const { data, error, isLoading } = useSWR("/trending/tv/week", fetcher.get);

	return { isLoading, error, trendingTv: data?.results };
}
