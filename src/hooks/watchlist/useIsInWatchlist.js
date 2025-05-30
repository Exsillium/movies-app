import fetcher from "../../swr/fetcher";
import useSWR from "swr";


export function useIsInWatchlist(mediaId, accountId, sessionId, mediaType = "movies") {
  const validType = mediaType === "tv" ? "tv" : "movies";
  const shouldFetch = !!(mediaId && accountId && sessionId);

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `/account/${accountId}/watchlist/${validType}?session_id=${sessionId}`
      : null,
    fetcher.get
  );

  const inWatchlist = data
    ? (data.results || []).some((item) => item.id === Number(mediaId))
    : false;

  return {
    inWatchlist,
    isLoading,
    error,
  };
}
