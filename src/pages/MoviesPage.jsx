import { Link } from "react-router-dom";
import useSWR from "swr";
import "../styles/Media.css";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import { tmdbApi } from "../apis/config";
import SectionTitle from "../components/layout/section/SectionTitle";
import { useLanguage } from "../LanguageContext";

const fetcher = (url) => tmdbApi.get(url).then((res) => res.data.results);

export default function MoviesPage() {
  const { t, language } = useLanguage();

  const { data: nowPlaying, error: nowPlayingError } = useSWR(
    `/movie/now_playing?language=${language}`,
    fetcher
  );
  const { data: popularMovies, error: popularError } = useSWR(
    `/movie/popular?language=${language}`,
    fetcher
  );
  const { data: topRatedMovies, error: topRatedError } = useSWR(
    `/movie/top_rated?language=${language}`,
    fetcher
  );

  const isLoading = !nowPlaying || !popularMovies || !topRatedMovies;
  const error = nowPlayingError || popularError || topRatedError;

  const categories = {
    now_playing: {
      title: t.now,
      endpoint: "/movie/now_playing",
      data: nowPlaying,
    },
    popular: {
      title: t.popular,
      endpoint: "/movie/popular",
      data: popularMovies,
    },
    top_rated: {
      title: t.topRated,
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
        <SectionTitle
          title={category.title}
          href={`/category/movie/${categoryKey}`}
        />
        <ShowsSlider
          language={language}
          shows={category.data}
          title={category.title}
          type={type}
        />
      </div>
    );
  };

  return (
    <div className="tv-shows-container">
      <div className="container-xl py-4">
        <h1 className="page-title mb-5">{t.moviesHub}</h1>
        {Object.keys(categories).map((categoryKey) =>
          renderCategory(categoryKey)
        )}
      </div>
    </div>
  );
}
