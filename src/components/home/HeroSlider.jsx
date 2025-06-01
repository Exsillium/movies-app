import { Link } from "react-router-dom";
import usePopularMovies from "../../hooks/swr/movies/usePopularMovies";
import SpinnerLoader from "../loaders/spinnerLoader";
import useSlidrIntervalCounter from "../../hooks/useSliderIntervalCounter";

export default function HeroSlider() {
	const { popMovies, isLoading, error } = usePopularMovies();
	const imageBaseUrl = "https://image.tmdb.org/t/p/original";
	const { currentIndex, setCurrentIndex } = useSlidrIntervalCounter(
		popMovies?.length,
		2000
	);

	if (isLoading) return <SpinnerLoader />;
	if (error) return <ErrorMessage error={error} />;

	if (!popMovies?.length) return null;

	const movie = popMovies[currentIndex];

	return (
		<div className="hero-slider">
			<div
				className="hero-slide"
				style={{
					backgroundImage: `url(${imageBaseUrl}${movie.backdrop_path})`,
				}}
			>
				<div className="overlay"></div>
				<div className="container">
					<div className="hero-content">
						<h1 className="hero-title">{movie.title}</h1>
						<div className="hero-meta">
							<span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
							<span className="bullet-separator">•</span>
							<span className="year">
								{new Date(movie.release_date).getFullYear()}
							</span>
						</div>
						<p className="hero-overview">{movie.overview}</p>
						<div className="hero-actions">
							<Link
								to={`/movie/${movie.id}`}
								className="btn btn-primary btn-lg"
							>
								<i className="fas fa-play me-2"></i>
								Watch Now
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="slider-navigation">
				{popMovies.map((_, index) => (
					<button
						key={index}
						className={`nav-dot ${index === currentIndex ? "active" : ""}`}
						onClick={() => setCurrentIndex(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
