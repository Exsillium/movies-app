import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAddToWatchlist } from "../../hooks/watchlist/useAddToWatchlist";
import { useRemoveFromWatchlist } from "../../hooks/watchlist/useRemoveFromWatchlist";
import { useIsInWatchlist } from "../../hooks/watchlist/useIsInWatchlist";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function HeroSection({ details, imageBaseUrl }) {
	const bgImage = details.backdrop_path
		? `${imageBaseUrl}${details.backdrop_path}`
		: "https://via.placeholder.com/1200x500?text=No+Backdrop";

	function getMediaType(details) {
		if (details.first_air_date || details.name) return "tv";
		if (details.release_date || details.title) return "movie";
		return "movie";
	}

	const sessionId = useSelector((state) => state.sessionId);
	const accountData = useSelector((state) => state.accountData);

	const { inWatchlist, isLoading: loadingWatchlist } = useIsInWatchlist(
		details.id,
		accountData?.id,
		sessionId,
		getMediaType(details)
	);

	const { add } = useAddToWatchlist(
		accountData?.id,
		sessionId,
		getMediaType(details)
	);
	const { remove } = useRemoveFromWatchlist(
		accountData?.id,
		sessionId,
		getMediaType(details)
	);

    const [optimisticWatchlist, setOptimisticWatchlist] = useState(inWatchlist);


    useEffect(() => {
        setOptimisticWatchlist(inWatchlist);
    }, [inWatchlist]);

    const handleWishlistToggle = () => {
        if (!accountData) return;

        setOptimisticWatchlist((prev) => !prev);
        if (optimisticWatchlist) {
            remove(details.id);
        } else {
            add(details.id);
        }
    };


	function getYear(details) {
		if (
			details.first_air_date &&
			!isNaN(new Date(details.first_air_date).getFullYear())
		) {
			return new Date(details.first_air_date).getFullYear();
		}
		if (
			details.release_date &&
			!isNaN(new Date(details.release_date).getFullYear())
		) {
			return new Date(details.release_date).getFullYear();
		}
		return null;
	}

	const year = getYear(details);



	return (
		<div
			className="hero-section position-relative"
			style={{
				backgroundImage: `url(${bgImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: "500px",
			}}
		>
			<div className="overlay position-absolute w-100 h-100" />
			<div className="container position-relative py-5">
				<div className="row align-items-center">
					<div className="col-md-4">
						<img
							src={`${imageBaseUrl}${details.poster_path}`}
							alt={details.name}
							className="img-fluid rounded-3 shadow-lg show-poster"
						/>
					</div>
					<div className="col-md-8 text-white">
						{<h1>{details.title || details.name}</h1>}
						<div className="d-flex align-items-center mb-3 flex-wrap">
							<span className="rating-badge me-3">
								⭐ {details.vote_average.toFixed(1)}
							</span>
							<span className="text-light opacity-75 me-3">
								{details.vote_count.toLocaleString()} votes
							</span>
							<span className="bullet-separator me-3">•</span>
							<span className="me-3">{year}</span>
							<span className="bullet-separator me-3">•</span>
							<span className="status-badge">{details.status}</span>
							{sessionId && (
            <button
                onClick={handleWishlistToggle}
                className="btn btn-link ms-3 p-0"
                style={{
                    verticalAlign: "middle",
                    textDecoration: "none",
                    boxShadow: "none",
                }}
                disabled={loadingWatchlist}
            >
                {loadingWatchlist ? (
                    <span className="spinner-border spinner-border-sm text-secondary" />
                ) : optimisticWatchlist ? (
                    <FaHeart className="text-danger fs-3" />
                ) : (
                    <FaRegHeart className="text-secondary fs-3" />
                )}
            </button>
        )}
							
						</div>
						<p className="lead mb-4">{details.overview}</p>
						<div className="genres-list">
							{details.genres.map((genre) => (
								<span key={genre.id} className="genre-badge">
									{genre.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
