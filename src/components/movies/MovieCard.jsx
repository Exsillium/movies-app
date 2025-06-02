import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAddToWatchlist } from "../../hooks/watchlist/useAddToWatchlist";
import { useRemoveFromWatchlist } from "../../hooks/watchlist/useRemoveFromWatchlist";
import { useIsInWatchlist } from "../../hooks/watchlist/useIsInWatchlist";
import { useSelector } from "react-redux";
import translations from "../../translations";
import useTranslatedDetails from "../../hooks/useTranslatedDetails ";

export default function MovieCard({ movie, onRemove, language }) {
  const t = translations[language] || translations.en;

  function getMediaType(details) {
    if (details.first_air_date || details.name) return "tv";
    if (details.release_date || details.title) return "movie";
    return "movie";
  }

  const mediaType = getMediaType(movie);
  const linkTo = `/${mediaType}/${movie.id}`;

  const sessionId = useSelector((state) => state.sessionId);
  const accountData = useSelector((state) => state.accountData);

  const { inWatchlist, isLoading: loadingWatchlist } = useIsInWatchlist(
    movie.id,
    accountData?.id,
    sessionId,
    mediaType
  );

  const { add } = useAddToWatchlist(accountData?.id, sessionId, mediaType);
  const { remove } = useRemoveFromWatchlist(
    accountData?.id,
    sessionId,
    mediaType
  );

  const { translated, loading: loadingTranslation } = useTranslatedDetails(
    mediaType,
    movie.id,
    language
  );

  const handleWishlistToggle = () => {
    if (!accountData) return;
    if (inWatchlist) {
      remove(movie.id);
    } else {
      add(movie.id);
    }
  };

  const handleRemoveFromWishlist = () => {
    if (onRemove) {
      onRemove(movie.id, mediaType);
    }
  };

  // Use translated fields if available, else fallback to original movie data
  const title =
    translated?.title ||
    (mediaType === "tv" ? movie.name : movie.title) ||
    t.noTitle;
  const overview = translated?.overview || movie.overview || t.noDescription;
  const releaseDate =
    translated?.release_date ||
    (mediaType === "tv" ? movie.first_air_date : movie.release_date) ||
    t.noReleaseDate;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="card mb-4 shadow-sm" style={{ borderRadius: "12px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={linkTo} className="text-decoration-none text-dark">
            <img
              src={posterUrl}
              className="img-fluid rounded-start"
              alt={title}
            />
          </Link>
        </div>
        <div className="col-md-8 p-3 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="fw-bold">{title}</h5>

              {onRemove ? (
                <FaHeart
                  onClick={handleRemoveFromWishlist}
                  size={20}
                  style={{ color: "#f1c40f", cursor: "pointer" }}
                  title={t.removeFromWatchlist}
                />
              ) : sessionId && accountData ? (
                <button
                  onClick={handleWishlistToggle}
                  className="btn btn-link p-0"
                  style={{
                    verticalAlign: "middle",
                    textDecoration: "none",
                    boxShadow: "none",
                    cursor: "pointer",
                  }}
                  aria-label={
                    inWatchlist ? t.removeFromWatchlist : t.addToWatchlist
                  }
                  title={inWatchlist ? t.removeFromWatchlist : t.addToWatchlist}
                >
                  {loadingWatchlist ? (
                    <span className="spinner-border spinner-border-sm text-secondary" />
                  ) : inWatchlist ? (
                    <FaHeart className="text-danger" size={20} />
                  ) : (
                    <FaRegHeart className="text-secondary" size={20} />
                  )}
                </button>
              ) : null}
            </div>
            <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
              {releaseDate}
            </p>
            <div className="mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{movie.vote_average / 2 > i ? "⭐" : "☆"}</span>
              ))}
              <span className="ms-2">({movie.vote_count || 0})</span>
            </div>
            <p className="card-text" style={{ fontSize: "0.9rem" }}>
              {overview.length > 150
                ? overview.slice(0, 150) + "..."
                : overview}
            </p>
          </div>
          <div className="d-flex justify-content-end">
            <Link to={linkTo} className="btn btn-sm btn-outline-primary me-2">
              {t.view}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
