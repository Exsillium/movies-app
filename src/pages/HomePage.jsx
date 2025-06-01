import { useSelector } from "react-redux";
import useAccountData from "../hooks/swr/useAccountData";
import HeroSlider from "../components/home/HeroSlider";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import useSWR from "swr";
import { tmdbApi } from "../apis/config";
import "../styles/Media.css";

const fetcher = (url) => tmdbApi.get(url).then((res) => res.data.results);

export default function HomePage() {
	const sessionId = useSelector((state) => state.sessionId);
	const { accountData } = useAccountData(sessionId);

	// Fetch trending movies and shows
	const { data: trendingMovies } = useSWR("/trending/movie/week", fetcher);

	const { data: trendingTv } = useSWR("/trending/tv/week", fetcher);

	const { data: upcomingMovies } = useSWR("/movie/upcoming", fetcher);

	return (
		<div className="home-page">
			{/* Hero Section */}
			<HeroSlider />

			<div className="container-xl py-5">
				{/* Welcome Message for logged-in users */}
				{accountData && (
					<div className="welcome-section text-center mb-5">
						<h2 className="welcome-title">
							Welcome back, {accountData.username}! 👋
						</h2>
						<p className="text-muted">
							Discover the latest and greatest in movies and TV shows
						</p>
					</div>
				)}

				{/* Trending Movies Section */}
				{trendingMovies && (
					<div className="mb-5">
						<ShowsSlider
							shows={trendingMovies}
							title="Trending Movies"
							type="movie"
						/>
					</div>
				)}

				{/* Trending TV Shows Section */}
				{trendingTv && (
					<div className="mb-5">
						<ShowsSlider
							shows={trendingTv}
							title="Trending TV Shows"
							type="tv"
						/>
					</div>
				)}

				{/* Upcoming Movies Section */}
				{upcomingMovies && (
					<div className="mb-5">
						<ShowsSlider
							shows={upcomingMovies}
							title="Coming Soon"
							type="movie"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
