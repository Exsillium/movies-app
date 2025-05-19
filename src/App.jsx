import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";


const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const TvShowDetailsPage = lazy(() => import("./pages/TvShowDetailsPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TvShowsPage = lazy(() => import("./pages/TvShowsPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container my-5">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/tv" element={<TvShowsPage />} />
            <Route path="/tv/:id" element={<TvShowDetailsPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/search/:query" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
