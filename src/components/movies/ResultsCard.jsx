import { useState } from "react";
import { Link } from "react-router-dom";
import TvShowModal from "../MediaModal";

export default function ResultsCard({ movie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const isTv = movie.media_type === "tv";
  const detailsLink = isTv ? `/tv/${movie.id}` : `/movie/${movie.id}`;
  const title = movie.title || movie.name;
  const overview = movie.overview || "No overview available.";

  return (
    <>
      <div className="tv-card">
        <div
          className="position-relative"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            className="tv-card-image"
            alt={title}
            loading="lazy"
          />
          <div className="tv-card-rating">
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </div>
        </div>

        <div className="tv-card-body">
          <h5 className="tv-card-title">{title}</h5>
          <p className="tv-card-overview">{overview}</p>
          <Link to={detailsLink} className="tv-card-link">
            View Details
          </Link>
        </div>
      </div>

      <TvShowModal
        show={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={isTv ? "tv" : "movie"}
      />
    </>
  );
}
