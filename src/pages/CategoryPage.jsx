import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from "../apis/config";
import TvShowCard from "../components/TvShowCard";
import Pagination from "../components/Pagination";
import '../styles/TvShows.css';

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const api_key = `c3ba834e295dac6c3509ddb9e2387366`;

  const categoryConfig = {
    popular: {
      title: "Popular Shows",
      endpoint: "/tv/popular"
    },
    topRated: {
      title: "Top Rated Shows",
      endpoint: "/tv/top_rated"
    },
    airing: {
      title: "Currently Airing Shows",
      endpoint: "/tv/on_the_air"
    }
  };

  useEffect(() => {
    if (!categoryConfig[category]) {
      navigate('/not-found');
      return;
    }

    const fetchShows = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${categoryConfig[category].endpoint}?api_key=${api_key}&page=${currentPage}`
        );
        setShows(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchShows();
  }, [category, currentPage, navigate]);

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
        {shows.map(show => (
          <div key={show.id} className="col">
            <TvShowCard show={show} type='tv' />
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