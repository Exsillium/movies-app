import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

export default function MovieCard({ movie, onRemove }) {
  function getMediaType(details) {
    if (details.first_air_date || details.name) return "tv";
    if (details.release_date || details.title) return "movie";
    return "movie";
  }

  const mediaType = getMediaType(movie);
  const linkTo = `/${mediaType}/${movie.id}`;

  const handleRemoveFromWishlist = () => {
    if (onRemove) {
      onRemove(movie.id, getMediaType(movie));
    }
  };
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
              alt={movie.title}
            />
          </Link>
        </div>
        <div className="col-md-8 p-3 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="fw-bold">{movie.title}</h5>

              <FaHeart
                onClick={handleRemoveFromWishlist}
                size={20}
                style={{ color: "#f1c40f", cursor: "pointer" }}
              />
            </div>
            <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
              {movie.release_date}
            </p>
            <div className="mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{movie.vote_average / 2 > i ? "⭐" : "☆"}</span>
              ))}
              <span className="ms-2">({movie.vote_count})</span>
            </div>
            <p className="card-text" style={{ fontSize: "0.9rem" }}>
              {movie.overview.length > 150
                ? movie.overview.slice(0, 150) + "..."
                : movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
