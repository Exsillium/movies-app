import useSWR from "swr";
import fetcher from "../../../swr/fetcher";
import { useLanguage } from "../../../LanguageContext";

export default function useTrendingTv() {
  const { language } = useLanguage();

  const { data, error, isLoading } = useSWR(
    `trending/tv/week?language=${language}`,
    fetcher.get
  );

  return { isLoading, error, trendingTv: data?.results };
}
