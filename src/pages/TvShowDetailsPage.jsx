import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../apis/config";
import ShowsSlider from "../components/ShowsSlider";
import HeroSection from "../components/details/HeroSection";
import ShowInfo from "../components/details/ShowInfo";
import CastList from "../components/details/CastList";
import AirDatesAndProduction from "../components/details/AirDatesAndProduction";
import '../styles/TvShows.css';

export default function TvShowDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api_key = `c3ba834e295dac6c3509ddb9e2387366`;
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const type = 'tv';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [showDetails, credits, similar] = await Promise.all([
          axiosInstance.get(`/tv/${id}?api_key=${api_key}`),
          axiosInstance.get(`/tv/${id}/credits?api_key=${api_key}`),
          axiosInstance.get(`/tv/${id}/similar?api_key=${api_key}`)
        ]);
        setDetails({ ...showDetails.data, credits: credits.data, similar: similar.data.results });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    if (!loading && details) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loading, details]);

  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100"><div className="loading-spinner" /></div>;
  if (error) return <div className="container py-5"><div className="error-message">Error loading show details: {error.message}</div></div>;
  if (!details) return null;

  return (
    <div className="tv-show-details">
      <HeroSection details={details} imageBaseUrl={imageBaseUrl} />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <ShowInfo details={details} />
            <CastList cast={details.credits.cast} imageBaseUrl={imageBaseUrl} />
          </div>
          <div className="col-lg-4">
            <AirDatesAndProduction details={details} imageBaseUrl={imageBaseUrl} />
          </div>
        </div>
        {details.similar.length > 0 && (
          <section className="mt-5">
            <ShowsSlider shows={details.similar} title="Similar Shows" type={type} />
          </section>
        )}
      </div>
    </div>
  );
}
