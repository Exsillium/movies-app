import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from "../apis/config";
import ShowsSlider from "../components/ShowsSlider";
import '../styles/TvShows.css';

export default function TvShowDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api_key = `c3ba834e295dac6c3509ddb9e2387366`;
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [showDetails, credits, similar] = await Promise.all([
          axiosInstance.get(`/tv/${id}?api_key=${api_key}`),
          axiosInstance.get(`/tv/${id}/credits?api_key=${api_key}`),
          axiosInstance.get(`/tv/${id}/similar?api_key=${api_key}`)
        ]);

        setDetails({
          ...showDetails.data,
          credits: credits.data,
          similar: similar.data.results
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Add new useEffect for scrolling after content is loaded
  useEffect(() => {
    if (!loading && details) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading, details]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="error-message">
          Error loading show details: {error.message}
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="tv-show-details">
      {/* Hero Section with Backdrop */}
      <div 
        className="hero-section position-relative"
        style={{
          backgroundImage: `url(${imageBaseUrl}${details.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px'
        }}
      >
        <div className="overlay position-absolute w-100 h-100" />
        <div className="container position-relative py-5">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img 
                src={`${imageBaseUrl}${details.poster_path}`}
                alt={details.name}
                className="img-fluid rounded-3 shadow-lg show-poster"
              />
            </div>
            <div className="col-md-8 text-white">
              <h1 className="display-4 fw-bold mb-3">{details.name}</h1>
              <div className="d-flex align-items-center mb-3 flex-wrap">
                <span className="rating-badge me-3">
                  ⭐ {details.vote_average.toFixed(1)}
                </span>
                <span className="text-light opacity-75 me-3">
                  {details.vote_count.toLocaleString()} votes
                </span>
                <span className="bullet-separator me-3">•</span>
                <span className="me-3">{new Date(details.first_air_date).getFullYear()}</span>
                <span className="bullet-separator me-3">•</span>
                <span className="status-badge">{details.status}</span>
              </div>
              <p className="lead mb-4">{details.overview}</p>
              <div className="genres-list">
                {details.genres.map(genre => (
                  <span key={genre.id} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container py-5">
        <div className="row">
          {/* Left Column - Show Details */}
          <div className="col-lg-8">
            <section className="show-info-section mb-5">
              <h3 className="section-title mb-4">Show Information</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="info-card h-100">
                    <div className="info-card-header">
                      <i className="fas fa-film info-icon"></i>
                      <h4>Seasons & Episodes</h4>
                    </div>
                    <div className="info-card-body">
                      <div className="info-item">
                        <span className="info-label">Seasons</span>
                        <span className="info-value">{details.number_of_seasons}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Episodes</span>
                        <span className="info-value">{details.number_of_episodes}</span>
                      </div>
                      {details.episode_run_time?.length > 0 && (
                        <div className="info-item">
                          <span className="info-label">Episode Runtime</span>
                          <span className="info-value">{details.episode_run_time[0]} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-card h-100">
                    <div className="info-card-header">
                      <i className="fas fa-info-circle info-icon"></i>
                      <h4>Details</h4>
                    </div>
                    <div className="info-card-body">
                      <div className="info-item">
                        <span className="info-label">Type</span>
                        <span className="info-value">{details.type}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Original Language</span>
                        <span className="info-value">{details.original_language.toUpperCase()}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Popularity</span>
                        <span className="info-value">{details.popularity.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cast Section */}
            {details.credits.cast.length > 0 && (
              <section className="cast-section mb-5">
                <h3 className="section-title mb-4">Featured Cast</h3>
                <div className="row g-4">
                  {details.credits.cast.slice(0, 6).map(person => (
                    <div key={person.id} className="col-sm-6 col-md-4">
                      <div className="cast-card">
                        <div className="cast-card-image">
                          <img 
                            src={person.profile_path 
                              ? `${imageBaseUrl}${person.profile_path}`
                              : 'https://via.placeholder.com/300x450?text=No+Image'
                            }
                            alt={person.name}
                            loading="lazy"
                          />
                          <div className="cast-card-overlay">
                            <div className="cast-card-content">
                              <h5 className="cast-name">{person.name}</h5>
                              <p className="cast-character">{person.character}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Production Info */}
          <div className="col-lg-4">
            <div className="info-card mb-4">
              <div className="info-card-header">
                <i className="fas fa-calendar info-icon"></i>
                <h4>Air Dates</h4>
              </div>
              <div className="info-card-body">
                <div className="info-item">
                  <span className="info-label">First Air Date</span>
                  <span className="info-value">
                    {new Date(details.first_air_date).toLocaleDateString()}
                  </span>
                </div>
                {details.last_air_date && (
                  <div className="info-item">
                    <span className="info-label">Last Air Date</span>
                    <span className="info-value">
                      {new Date(details.last_air_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {details.production_companies.length > 0 && (
              <div className="info-card">
                <div className="info-card-header">
                  <i className="fas fa-building info-icon"></i>
                  <h4>Production Companies</h4>
                </div>
                <div className="info-card-body">
                  <div className="production-companies">
                    {details.production_companies.map(company => (
                      <div key={company.id} className="production-company">
                        <div className="production-company-image">
                          {company.logo_path ? (
                            <img 
                              src={`${imageBaseUrl}${company.logo_path}`}
                              alt={company.name}
                              className="production-company-logo"
                            />
                          ) : (
                            <div className="production-company-placeholder">
                              {company.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h6 className="company-name mt-2">
                          {company.name}
                        </h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Shows */}
        {details.similar.length > 0 && (
          <section className="mt-5">
            <ShowsSlider shows={details.similar} title="Similar Shows" />
          </section>
        )}
      </div>
    </div>
  );
}
