import useSWR from "swr";
import fetcher from "../../../swr/fetcher";
import { useLanguage } from "../../../LanguageContext";

export default function useUpcomingMovies() {
  const { language } = useLanguage();

  const { data, error, isLoading } = useSWR(
    `movie/upcoming?language=${language}`,
    fetcher.get
  );

  return { isLoading, error, upcomingMovies: data?.results };
}
