import React, { useState } from "react";
import { Link } from "react-router-dom";
import TvShowModal from "../MediaModal";

export default function TvShowCard({ show, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const isTv = type === "tv";

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
          <Link to={detailsLink} className="tv-card-link">
            View Details
          </Link>
        </div>
      </div>

      <TvShowModal
        show={show}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={type}
      />
    </>
  );
}
