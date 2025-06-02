import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "../apis/config";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import HeroSection from "../components/details/HeroSection";
import ShowInfo from "../components/details/ShowInfo";
import CastList from "../components/details/CastList";
import AirDatesAndProduction from "../components/details/AirDatesAndProduction";
import "../styles/Media.css";
import { useLanguage } from "../LanguageContext";

export default function TvShowDetailsPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const type = "tv";

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [showDetails, credits, similar] = await Promise.all([
          tmdbApi.get(`/tv/${id}?language=${language}`),
          tmdbApi.get(`/tv/${id}/credits?language=${language}`),
          tmdbApi.get(`/tv/${id}/similar?language=${language}`),
        ]);
        setDetails({
          ...showDetails.data,
          credits: credits.data,
          similar: similar.data.results,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, language]); // trigger re-fetch if language changes

  useEffect(() => {
    if (!loading && details) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loading, details]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="loading-spinner" />
      </div>
    );
  if (error)
    return (
      <div className="container py-5">
        <div className="error-message">
          Error loading show details: {error.message}
        </div>
      </div>
    );
  if (!details) return null;

  return (
    <div className="tv-show-details">
      <HeroSection details={details} imageBaseUrl={imageBaseUrl} />
      <div className="container py-5 HeroSection">
        <div className="row">
          <div className="col-lg-8">
            <ShowInfo language={language} details={details} />
            <CastList
              language={language}
              cast={details.credits.cast}
              imageBaseUrl={imageBaseUrl}
            />
          </div>
          <div className="col-lg-4">
            <AirDatesAndProduction
              language={language}
              details={details}
              imageBaseUrl={imageBaseUrl}
            />
          </div>
        </div>
        {details.similar.length > 0 && (
          <section className="mt-5">
            <ShowsSlider
              language={language}
              shows={details.similar}
              title={t.similar || "Similar Shows"}
              type={type}
            />
          </section>
        )}
      </div>
    </div>
  );
}
