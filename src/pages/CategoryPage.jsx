import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TvShowCard from "../components/tvshows/TvShowCard";
import Pagination from "../components/tvshows/Pagination";
import "../styles/Media.css";
import { tmdbApi } from "../apis/config";
import {
  movieCategoryConfig,
  tvCategoryConfig,
} from "../config/categoryConfig";

export default function CategoryPage() {
  const { type, category } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const categoryConfig =
    type === "movie" ? movieCategoryConfig : tvCategoryConfig;

  useEffect(() => {
    if (!categoryConfig[category]) {
      navigate("/not-found");
      return;
    }

    const fetchShows = async () => {
      setLoading(true);
      try {
        const endpoint = `${categoryConfig[category].endpoint}?page=${currentPage}`;
        const response = await tmdbApi.get(endpoint);
        setShows(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchShows();
  }, [category, currentPage, categoryConfig, navigate]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

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
          Error loading shows: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="category-page container-xl py-4">
      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1 className="mb-0">{categoryConfig[category].title}</h1>
      </div>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {shows.map((show) => (
          <div key={show.id} className="col">
            <TvShowCard show={show} type={type} />{" "}
            {/* <--- type passed dynamically */}
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
