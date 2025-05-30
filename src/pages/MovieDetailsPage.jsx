import { useParams } from "react-router";
import { tmdbApi } from "../apis/config";
import { useState, useEffect } from "react";
import HeroSection from "../components/details/HeroSection";
import RecommendedMovies from "../components/movies/RecommendedMovies";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await tmdbApi.get(`/movie/${id}`);
        setDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          Error: {error.message}
        </div>
      </div>
    );

  if (!details) return null;

  return (
    <>
      <HeroSection details={details} imageBaseUrl={imageBaseUrl} />
      <div className="container mt-4">
        <RecommendedMovies movieId={id} />
      </div>
    </>
  );
}
