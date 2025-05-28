import RecommendedMovies from "../components/movies/RecommendedMovies";
import { useParams } from "react-router";
import axiosInstance from "../apis/config";
import { useState, useEffect } from "react";
import HeroSection from "../components/details/HeroSection";

export default function MovieDetailsPage() {
	const param = useParams();
	const [movie, setMovie] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const apiKey = `c3ba834e295dac6c3509ddb9e2387366`;

	async function fetchMovieDetails() {
		try {
			setLoading(true);
			const response = await axiosInstance.get(
				`/movie/${param.id}?api_key=${apiKey}`
			);
			setMovie(response.data);
			setLoading(false);
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchMovieDetails();
	}, [param.id]);

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

	if (!movie) {
		return (
			<div className="container py-5">
				<div className="alert alert-warning text-center">No movie found</div>
			</div>
		);
	}

	const posterUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<>
			<HeroSection
				details={movie}
				imageBaseUrl="https://image.tmdb.org/t/p/w500"
			/>

			<div className="container mt-4">
				<RecommendedMovies movieId={param.id} />
			</div>
		</>
	);
}
