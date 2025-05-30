import fetcher from "../swr/fetcher";
import useSWR from "swr";
import { mutate } from "swr";



export function useAddToWatchlist(accountId, sessionId, mediaType = "movie") {
  const key = `/account/${accountId}/watchlist/${mediaType === "tv" ? "tv" : "movies"}?session_id=${sessionId}`;


  const add = async (mediaId) => {
    try {
      await fetcher.post(
        `/account/${accountId}/watchlist?session_id=${sessionId}`,
        {
          media_type: mediaType,
          media_id: mediaId,
          watchlist: true,
        }
      );

      mutate(key);
    } catch (error) {
      throw error;
    }
  };

  return { add };
}



export function useRemoveFromWatchlist(accountId, sessionId, mediaType = "movie") {
  const key = `/account/${accountId}/watchlist/${mediaType === "tv" ? "tv" : "movies"}?session_id=${sessionId}`;


  const remove = async (mediaId) => {
    try {
      await fetcher.post(
        `/account/${accountId}/watchlist?session_id=${sessionId}`,
        {
          media_type: mediaType,
          media_id: mediaId,
          watchlist: false,
        }
      );

      mutate(key);
    } catch (error) {
      throw error;
    }
  };

  return { remove };
}


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
