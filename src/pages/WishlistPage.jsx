import MovieCard from "../components/movies/MovieCard";
import { useSelector } from "react-redux";
import { FaHeartBroken } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WishlistPage() {
	const wishItem = useSelector((state) => state.wishlist.wishItem || []);

	return (
		<div className="container mt-4">
			<h3 className="fw-bold mb-4">Watch list</h3>
			{wishItem.length === 0 ? (
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
					{wishItem.map((items) => (
						<div className="col-md-6" key={items.id}>
							<MovieCard movie={items} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
