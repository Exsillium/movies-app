import fetcher from "../../swr/fetcher";
import { mutate } from "swr";


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