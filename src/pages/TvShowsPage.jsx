import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Media.css";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import { tmdbApi } from "../apis/config";
import translations from "../translations";

export default function TvShowsPage({ language }) {
  const t = translations[language] || translations.en;
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [airingTV, setAiringTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = {
    popular: {
      title: t.popularTv,
      endpoint: "/tv/popular",
      data: popularTV,
      setData: setPopularTV,
    },
    topRated: {
      title: t.topRatedTv,
      endpoint: "/tv/top_rated",
      data: topRatedTV,
      setData: setTopRatedTV,
    },
    airing: {
      title: t.airing,
      endpoint: "/tv/on_the_air",
      data: airingTV,
      setData: setAiringTV,
    },
  };

  useEffect(() => {
    const fetchAllShows = async () => {
      setLoading(true);
      setError(null);
      try {
        const [popularRes, topRatedRes, airingRes] = await Promise.all([
          tmdbApi.get(`/tv/popular`),
          tmdbApi.get(`/tv/top_rated`),
          tmdbApi.get(`/tv/on_the_air`),
        ]);

        setPopularTV(popularRes.data.results);
        setTopRatedTV(topRatedRes.data.results);
        setAiringTV(airingRes.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllShows();
  }, []);

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
          Error loading TV shows: {error.message}
        </div>
      </div>
    );
  }
  const type = "tv";
  const renderCategory = (categoryKey) => {
    const category = categories[categoryKey];

    return (
      <div key={categoryKey} className="mb-5">
        <div className="d-flex align-items-center mb-4">
          <Link
            to={`/category/tv/${categoryKey}`}
            className="category-header d-flex align-items-center text-decoration-none flex-grow-1"
          >
            <h2 className="section-title mb-0">{category.title}</h2>
            <button className="btn btn-link ms-3">{t.viewAll}</button>
          </Link>
        </div>

        <ShowsSlider language={language} shows={category.data} title={category.title} type={type} />
      </div>
    );
  };

  return (
    <div className="tv-shows-container">
      <div className="container-xl py-4">
        <h1 className="page-title mb-5">{t.tvshowsHub}</h1>
        {Object.keys(categories).map((categoryKey) =>
          renderCategory(categoryKey)
        )}
      </div>
    </div>
  );
}
