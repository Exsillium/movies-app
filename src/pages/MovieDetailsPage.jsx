import { useParams } from "react-router";
import { tmdbApi } from "../apis/config";
import { useState, useEffect } from "react";
import HeroSection from "../components/details/HeroSection";
import CastList from "../components/details/CastList";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import RecommendedMovies from "../components/movies/RecommendedMovies"; 
import { useLanguage } from "../LanguageContext";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const type = "movie";

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [movieDetails, credits, similar] = await Promise.all([
          tmdbApi.get(`/movie/${id}?language=${language}`),
          tmdbApi.get(`/movie/${id}/credits?language=${language}`),
          tmdbApi.get(`/movie/${id}/similar?language=${language}`),
        ]);
        setDetails({
          ...movieDetails.data,
          credits: credits.data,
          similar: similar.data.results,
        });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, language]);

  useEffect(() => {
    if (!loading && details) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loading, details]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t.loading || "Loading..."}</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          {t.errorLoading || "Error loading movie details"}: {error.message}
        </div>
      </div>
    );

  if (!details) return null;

  return (
    <div className="movie-details">
      <HeroSection details={details} imageBaseUrl={imageBaseUrl} />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8">
            <CastList
              language={language}
              cast={details.credits.cast}
              imageBaseUrl={imageBaseUrl}
            />
          </div>
        </div>

        {details.similar.length > 0 && (
          <section className="mt-5">
            <ShowsSlider
              shows={details.similar}
              title={t.similarMovies || "Similar Movies"}
              type={type}
            />
          </section>
        )}
        <RecommendedMovies movieId={id} language={language} />
      </div>
    </div>
  );
}
