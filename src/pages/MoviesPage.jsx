import { Link } from "react-router-dom";
import useSWR from "swr";
import "../styles/Media.css";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import { tmdbApi } from "../apis/config";

const fetcher = (url) => tmdbApi.get(url).then((res) => res.data.results);

export default function MoviesPage() {
  const { data: nowPlaying, error: nowPlayingError } = useSWR(
    "/movie/now_playing",
    fetcher
  );
  const { data: popularMovies, error: popularError } = useSWR(
    "/movie/popular",
    fetcher
  );
  const { data: topRatedMovies, error: topRatedError } = useSWR(
    "/movie/top_rated",
    fetcher
  );

  const isLoading = !nowPlaying || !popularMovies || !topRatedMovies;
  const error = nowPlayingError || popularError || topRatedError;

  const categories = {
    now_playing: {
      title: "Now Playing",
      endpoint: "/movie/now_playing",
      data: nowPlaying,
    },
    popular: {
      title: "Popular Movies",
      endpoint: "/movie/popular",
      data: popularMovies,
    },
    top_rated: {
      title: "Top Rated Movies",
      endpoint: "/movie/top_rated",
      data: topRatedMovies,
    },
  };

  if (isLoading) {
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
          Error loading movies: {error.message}
        </div>
      </div>
    );
  }

  const type = "movie";

  const renderCategory = (categoryKey) => {
    const category = categories[categoryKey];

    return (
      <div key={categoryKey} className="mb-5">
        <div className="d-flex align-items-center mb-4">
          <Link
            to={`/category/movie/${categoryKey}`}
            className="category-header d-flex align-items-center text-decoration-none flex-grow-1"
          >
            <h2 className="section-title mb-0">{category.title}</h2>
            <button className="btn btn-link ms-3">View All</button>
          </Link>
        </div>

        <ShowsSlider shows={category.data} title={category.title} type={type} />
      </div>
    );
  };

  return (
    <div className="tv-shows-container">
      <div className="container-xl py-4">
        <h1 className="page-title mb-5">Movies Hub</h1>
        {Object.keys(categories).map((categoryKey) =>
          renderCategory(categoryKey)
        )}
      </div>
    </div>
  );
}
