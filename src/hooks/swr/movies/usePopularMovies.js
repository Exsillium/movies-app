import useSWR from "swr";
import fetcher from "../../../swr/fetcher";
import { useLanguage } from "../../../LanguageContext";

export default function usePopularMovies(len) {
	const { language } = useLanguage();

	const { isLoading, error, data } = useSWR(
		`movie/popular?language=${language}`,
		fetcher.get
	);

	return {
		isLoading,
		error,
		popMovies: len ? data?.results?.slice(0, len) : data?.results,
	};
}
