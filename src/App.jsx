import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";
import LoginPage from "./pages/Login";
import Navbar from "./components/layout/navBar/Navbar";
import Footer from "./components/layout/Footer";
import { LanguageProvider } from "./LanguageContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const TvShowDetailsPage = lazy(() => import("./pages/TvShowDetailsPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TvShowsPage = lazy(() => import("./pages/TvShowsPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const Movies = lazy(() => import("./pages/MoviesPage"));

function App() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		setTheme(savedTheme);
		document.body.classList.remove("theme-light", "theme-dark");
		document.body.classList.add(`theme-${savedTheme}`);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.body.classList.remove("theme-light", "theme-dark");
		document.body.classList.add(`theme-${newTheme}`);
	};

	return (
		<LanguageProvider>
			<BrowserRouter>
				<div className="d-flex flex-column min-vh-100">
					<Navbar toggleTheme={toggleTheme} currentTheme={theme} />
					<div className="container flex-grow-1 my-5">
						<Suspense fallback={<div>Loading...</div>}>
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route path="/movies" element={<Movies />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/movie/:id" element={<MovieDetailsPage />} />
								<Route path="/tv" element={<TvShowsPage />} />
								<Route path="/tv/:id" element={<TvShowDetailsPage />} />
								<Route
									path="/category/:type/:category"
									element={<CategoryPage />}
								/>
								<Route path="/wishlist" element={<WishlistPage />} />
								<Route path="/search/:query" element={<SearchResultsPage />} />
								<Route path="*" element={<NotFoundPage />} />
							</Routes>
						</Suspense>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</LanguageProvider>
	);
}

export default App;
