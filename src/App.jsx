import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";
import LoginPage from "./pages/Login";
import Navbar from "./components/layout/navBar/Navbar";
import Footer from "./components/layout/Footer";

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
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		setTheme(savedTheme);
		document.body.classList.remove("theme-light", "theme-dark");
		document.body.classList.add(`theme-${savedTheme}`);
	}, []);

	useEffect(() => {
		const savedLang = localStorage.getItem("language") || "en";
		setLanguage(savedLang);
		document.body.setAttribute("dir", savedLang === "ar" ? "rtl" : "ltr");
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.body.classList.remove("theme-light", "theme-dark");
		document.body.classList.add(`theme-${newTheme}`);
	};

	return (
		<BrowserRouter>
			<div className="d-flex flex-column min-vh-100">
				<Navbar
					toggleTheme={toggleTheme}
					currentTheme={theme}
					language={language}
					setLanguage={setLanguage}
				/>
				<div className="container flex-grow-1 my-5 mx-auto">
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path="/" element={<HomePage language={language} />} />
							<Route path="/movies" element={<Movies language={language} />} />
							<Route
								path="/login"
								element={<LoginPage language={language} />}
							/>
							<Route
								path="/movie/:id"
								element={<MovieDetailsPage language={language} />}
							/>
							<Route path="/tv" element={<TvShowsPage language={language} />} />
							<Route
								path="/tv/:id"
								element={<TvShowDetailsPage language={language} />}
							/>
							<Route
								path="/category/:type/:category"
								element={<CategoryPage language={language} />}
							/>
							<Route
								path="/wishlist"
								element={<WishlistPage language={language} />}
							/>
							<Route
								path="/search/:query"
								element={<SearchResultsPage language={language} />}
							/>
							<Route path="*" element={<NotFoundPage language={language} />} />
						</Routes>
					</Suspense>
				</div>
				<Footer language={language} />
			</div>
		</BrowserRouter>
	);
}

export default App;
