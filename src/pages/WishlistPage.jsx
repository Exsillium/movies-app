import MovieCard from "../components/movies/MovieCard";
import { useSelector } from "react-redux";
import { FaHeartBroken } from "react-icons/fa";
import { Link } from "react-router-dom";
import fetcher from "../swr/fetcher";
import { useRemoveFromWatchlist } from "../hooks/watchlist/useRemoveFromWatchlist";
import useSWR from "swr";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../LanguageContext";

export default function WishlistPage() {
  const { t, language } = useLanguage();
  const sessionId = useSelector((state) => state.sessionId);
  const accountData = useSelector((state) => state.accountData);
  const [wishItems, setWishItems] = useState([]);

  // SWR fetch watchlist movies and tv shows
  const { data: moviesData, isLoading: loadingMovies } = useSWR(
    accountData && sessionId
      ? `/account/${accountData.id}/watchlist/movies?session_id=${sessionId}`
      : null,
    fetcher.get
  );
  const { data: tvData, isLoading: loadingTv } = useSWR(
    accountData && sessionId
      ? `/account/${accountData.id}/watchlist/tv?session_id=${sessionId}`
      : null,
    fetcher.get
  );

  // Combine movies and TV shows into one list
  useEffect(() => {
    if (moviesData || tvData) {
      setWishItems([
        ...(moviesData?.results || []),
        ...(tvData?.results || []),
      ]);
    }
  }, [moviesData, tvData]);

  const loading = loadingMovies || loadingTv;

  // Determine media type based on item properties
  function getMediaType(details) {
    if (details.first_air_date || details.name) return "tv";
    if (details.release_date || details.title) return "movie";
    return "movie";
  }

  const removeMovie = useRemoveFromWatchlist(
    accountData?.id,
    sessionId,
    "movie"
  ).remove;
  const removeTV = useRemoveFromWatchlist(
    accountData?.id,
    sessionId,
    "tv"
  ).remove;

  const handleRemove = useCallback(
    (itemId) => {
      const item = wishItems.find((i) => i.id === itemId);
      if (!item) return;

      const mediaType = getMediaType(item);
      setWishItems((prev) => prev.filter((i) => i.id !== itemId));

      if (accountData && sessionId) {
        if (mediaType === "movie") {
          removeMovie(itemId).catch((err) =>
            console.error("Failed to remove movie from TMDB:", err)
          );
        } else if (mediaType === "tv") {
          removeTV(itemId).catch((err) =>
            console.error("Failed to remove tv show from TMDB:", err)
          );
        }
      }
    },
    [wishItems, accountData, sessionId, removeMovie, removeTV]
  );

  if (loading) {
    return (
      <div className="text-center my-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        />
      </div>
    );
  }

  if (!wishItems.length) {
    return (
      <div className="text-center my-5">
        <FaHeartBroken size={50} className="text-muted mb-3" />
        <h5>{t.emptyWatchlist}</h5>
        <Link to="/" className="btn btn-primary mt-3">
          {t.goBackHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h3 className="mb-4">{t.watchlist}</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {wishItems.map((item) => (
          <div key={`${item.id}-${getMediaType(item)}`} className="col">
            <MovieCard movie={item} onRemove={handleRemove} language={language} />
          </div>
        ))}
      </div>
    </div>
  );
}
