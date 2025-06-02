import useSWR from "swr";
import fetcher from "../../../swr/fetcher";
import { useLanguage } from "../../../LanguageContext";

export default function useTrendingMovies() {
  const { language } = useLanguage();

  const { data, isLoading, error } = useSWR(
    `trending/movie/week?language=${language}`,
    fetcher.get
  );

  return { isLoading, error, trendingMovies: data?.results };
}
