import { useSelector } from "react-redux";
import HeroSlider from "../components/home/HeroSlider";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import "../styles/Media.css";
import useTrendingMovies from "../hooks/swr/movies/useTrendingMovies";
import useTrendingTv from "../hooks/swr/tv/useTrendingTv";
import useUpcomingMovies from "../hooks/swr/movies/useUpcomingMovies";
import SectionTitle from "../components/layout/section/SectionTitle";
import { useLanguage } from "../LanguageContext";
export default function HomePage() {
  const { t, language } = useLanguage();

  const accountData = useSelector((state) => state.accountData);
  // Fetch trending movies and shows
  const { trendingMovies } = useTrendingMovies();
  const { trendingTv } = useTrendingTv();
  const { upcomingMovies } = useUpcomingMovies();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSlider language={language} />

      <div className="container-xl py-5">
        {/* Welcome Message for logged-in users */}
        {accountData && (
          <div className="welcome-section text-center mb-5">
            <h2 className="welcome-title">
              {t.welcomeBack} {accountData.username}! 👋
            </h2>
            <p className="text-muted">
              {t.discover}
            </p>
          </div>
        )}

        {/* Trending Movies Section */}
        {trendingMovies && (
          <div className="mb-5">
            <SectionTitle
              href={"/category/movie/trending"}
              title={t.trendingMovies}
            />
            <ShowsSlider
              language={language}
              shows={trendingMovies}
              title="Trending Movies"
              type="movie"
            />
          </div>
        )}

        {/* Trending TV Shows Section */}
        {trendingTv && (
          <div className="mb-5">
            <SectionTitle
              href={"/category/tv/trending"}
              title={t.trendingTV}
            />
            <ShowsSlider
              language={language}
              shows={trendingTv}
              title="Trending TV Shows"
              type="tv"
            />
          </div>
        )}

        {/* Upcoming Movies Section */}
        {upcomingMovies && (
          <div className="mb-5">
            <SectionTitle
              href={"/category/movie/upcoming"}
              title={t.comingSoon}
            />
            <ShowsSlider
              language={language}
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
