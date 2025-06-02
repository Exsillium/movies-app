import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TvShowModal from "../MediaModal";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAddToWatchlist } from "../../hooks/watchlist/useAddToWatchlist";
import { useRemoveFromWatchlist } from "../../hooks/watchlist/useRemoveFromWatchlist";
import { useIsInWatchlist } from "../../hooks/watchlist/useIsInWatchlist";
import { useSelector } from "react-redux";
import translations from "../../translations";

export default function TvShowCard({ show, type , language }) {
  const t = translations[language] || translations.en;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const isTv = type === "tv";

  const sessionId = useSelector((state) => state.sessionId);
  const accountData = useSelector((state) => state.accountData);

  const { inWatchlist, isLoading: loadingWatchlist } = useIsInWatchlist(
    show.id,
    accountData?.id,
    sessionId,
    isTv ? "tv" : "movie"
  );

  const { add } = useAddToWatchlist(
    accountData?.id,
    sessionId,
    isTv ? "tv" : "movie"
  );

  const { remove } = useRemoveFromWatchlist(
    accountData?.id,
    sessionId,
    isTv ? "tv" : "movie"
  );

  const [optimisticWatchlist, setOptimisticWatchlist] = useState(inWatchlist);

  useEffect(() => {
    setOptimisticWatchlist(inWatchlist);
  }, [inWatchlist]);

  const handleWishlistToggle = () => {
    if (!accountData) return;
    setOptimisticWatchlist((prev) => !prev);
    if (optimisticWatchlist) {
      remove(show.id);
    } else {
      add(show.id);
    }
  };

  let detailsLink = isTv ? `/tv/${show.id}` : `/movie/${show.id}`;
  return (
    <>
      <div className="tv-card">
        <div
          className="position-relative"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`${imageBaseUrl}${show.poster_path}`}
            className="tv-card-image"
            alt={show.name}
            loading="lazy"
          />
          <div className="tv-card-rating">
            ⭐ {show.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="tv-card-body">
          <h5 className="tv-card-title">{show.name}</h5>
          <p className="tv-card-overview">{show.overview}</p>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={detailsLink} className="tv-card-link">
              {t.view}
            </Link>
            {sessionId && accountData ? (
              <button
                onClick={handleWishlistToggle}
                className="btn btn-link p-0"
                style={{
                  verticalAlign: "middle",
                  textDecoration: "none",
                  boxShadow: "none",
                }}
              >
                {loadingWatchlist ? (
                  <span className="spinner-border spinner-border-sm text-secondary" />
                ) : optimisticWatchlist ? (
                  <FaHeart className="text-danger" size={20} />
                ) : (
                  <FaRegHeart className="text-secondary" size={20} />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <TvShowModal
        language={language}
        show={show}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={type}
      />
    </>
  );
}
