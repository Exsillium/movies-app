import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tmdbApi } from "../apis/config";
import { useLanguage } from "../LanguageContext";

export default function TvShowModal({ show, isOpen, onClose, type }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const isTv = type === "tv";
  const endpoint = isTv ? `/tv/${show.id}` : `/movie/${show.id}`;

  useEffect(() => {
    if (isOpen && show) {
      setLoading(true);
      setError(null);
      tmdbApi
        .get(endpoint, { params: { language } }) 
        .then((response) => {
          setDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [isOpen, show, endpoint, language]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-backdrop"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1040,
        }}
        onClick={onClose}
      />
      <div
        className="modal show d-block"
        tabIndex="-1"
        style={{ zIndex: 1045 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title">{show.name}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="loading-spinner" />
                </div>
              ) : error ? (
                <div className="error-message">
                  {t.err} {error.message}
                </div>
              ) : (
                details && (
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={`${imageBaseUrl}${details.poster_path}`}
                        alt={details.name}
                        className="img-fluid rounded"
                      />
                      <div className="mt-3">
                        <p className="mb-1">
                          <strong>{t.rating}</strong> ⭐{" "}
                          {details.vote_average.toFixed(1)} (
                          {details.vote_count} {t.votes})
                        </p>
                        <p className="mb-1">
                          <strong>{t.status}:</strong> {details.status}
                        </p>
                        <p className="mb-1">
                          <strong>{t.first}:</strong>{" "}
                          {new Date(
                            details.first_air_date
                          ).toLocaleDateString()}
                        </p>
                        {details.last_air_date && (
                          <p className="mb-1">
                            <strong>{t.last}:</strong>{" "}
                            {new Date(
                              details.last_air_date
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h6 className="fw-bold mb-3">{t.overview}</h6>
                      <p>{details.overview}</p>

                      <h6 className="fw-bold mb-3 mt-4">{t.details}</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="mb-1">
                            <strong>{t.seasons}:</strong>{" "}
                            {details.number_of_seasons}
                          </p>
                          <p className="mb-1">
                            <strong>{t.episodes}:</strong>{" "}
                            {details.number_of_episodes}
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <p className="mb-1">
                            <strong>{t.origin}:</strong>{" "}
                            {details.original_language.toUpperCase()}
                          </p>
                          <p className="mb-1">
                            <strong>{t.type}</strong> {details.type}
                          </p>
                        </div>
                      </div>

                      <h6 className="fw-bold mb-3 mt-4">{t.generes}:</h6>
                      <div className="mb-4">
                        {details.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="badge bg-secondary me-2 mb-2"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>

                      {details.production_companies.length > 0 && (
                        <>
                          <h6 className="fw-bold mb-3">{t.production}:</h6>
                          <div>
                            {details.production_companies.map((company) => (
                              <span
                                key={company.id}
                                className="badge bg-secondary text-dark me-2 mb-2"
                              >
                                {company.name}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="mt-4">
                        <button
                          className="tv-card-link"
                          onClick={() => {
                            onClose();
                            navigate(
                              isTv ? `/tv/${show.id}` : `/movie/${show.id}`
                            );
                          }}
                        >
                          {t.view}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
