import MovieCard from "../components/movies/MovieCard";
import { useSelector } from "react-redux";
import { FaHeartBroken } from "react-icons/fa";
import { Link } from "react-router-dom";
import fetcher from "../swr/fetcher";
import useAccountData from "../hooks/swr/useAccountData";
import { useRemoveFromWatchlist } from '../hooks/watchlist/useRemoveFromWatchlist';
import useSWR from "swr";
import { useState , useEffect } from "react";

export default function WishlistPage() {
	const sessionId = useSelector((state) => state.sessionId);
  	const { accountData } = useAccountData(sessionId);
 	const [wishItems, setWishItems] = useState([]);

  // SWR for movies
  const { data: moviesData, isLoading: loadingMovies } = useSWR(
    accountData && sessionId
      ? `/account/${accountData.id}/watchlist/movies?session_id=${sessionId}`
      : null,
    fetcher.get
  );

  // SWR for TV shows
  const { data: tvData, isLoading: loadingTv } = useSWR(
    accountData && sessionId
      ? `/account/${accountData.id}/watchlist/tv?session_id=${sessionId}`
      : null,
    fetcher.get
  );


	useEffect(() => {
    if (moviesData || tvData) {
      setWishItems([
        ...(moviesData?.results || []),
        ...(tvData?.results || []),
      ]);
    }
  }, [moviesData, tvData]);

  const loading = loadingMovies || loadingTv;

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="container mt-4 text-center">
        <h4>Please log in to view your watchlist.</h4>
      </div>
    );
  }
  function getMediaType(details) {
    if (details.first_air_date || details.name) return "tv";
    if (details.release_date || details.title) return "movie";
    return "movie";
  }


const handleRemove = (movieId) => {
  const item = wishItems.find((item) => item.id === movieId);
  const mediaType = getMediaType(item);
  const { remove } = useRemoveFromWatchlist(accountData?.id, sessionId, mediaType);

  setWishItems((prev) => prev.filter((item) => item.id !== movieId));
  if (accountData && sessionId) {
    remove(movieId)
      .catch((err) => console.error("Failed to remove from TMDB:", err));
  }
};

	return (
		<div className="container mt-4">
			<h3 className="fw-bold mb-4">Watch list</h3>
			{wishItems.length === 0 ? (
				<div className="text-center p-5 bg-light rounded shadow-sm">
					<FaHeartBroken size={60} color="#e74c3c" className="mb-3" />
					<h4>Your watchlist is empty 🥲</h4>
					<p className="text-muted">You haven’t added any movies yet.</p>
					<Link to="/" className="btn btn-primary mt-3">
						Explore Movies
					</Link>
				</div>
			) : (
				<div className="row">
					{wishItems.map((items) => (
						<div className="col-md-6" key={items.id}>
							<MovieCard movie={items} onRemove={handleRemove} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
