import { useState, useEffect } from "react";
import { tmdbApi } from "../../apis/config";
import ShowsSlider from "../tvshows/ShowsSlider";
import "../../styles/Media.css";

export default function RecommendedMovies(props) {
  const movieId = props.movieId;
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const type = "movie";
  const fetchRecommendedMovies = async () => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}/recommendations`);
      setRecommendedMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error fetching recommended movies:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRecommendedMovies();
  }, [movieId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {recommendedMovies.length > 0 && (
        <section className="mt-5">
          <ShowsSlider
            shows={recommendedMovies}
            title="Recommended Movies"
            type={type}
          />
        </section>
      )}
    </>
  );
}
