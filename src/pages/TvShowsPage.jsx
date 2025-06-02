import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Media.css";
import ShowsSlider from "../components/tvshows/ShowsSlider";
import { tmdbApi } from "../apis/config";
import { useLanguage } from "../LanguageContext";
import SectionTitle from "../components/layout/section/SectionTitle";

export default function TvShowsPage() {
	const { t, language } = useLanguage();
	const [popularTV, setPopularTV] = useState([]);
	const [topRatedTV, setTopRatedTV] = useState([]);
	const [airingTV, setAiringTV] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const categories = {
		popular: {
			title: t.popularTv,
			endpoint: "/tv/popular",
			data: popularTV,
			setData: setPopularTV,
		},
		topRated: {
			title: t.topRatedTv,
			endpoint: "/tv/top_rated",
			data: topRatedTV,
			setData: setTopRatedTV,
		},
		airing: {
			title: t.airing,
			endpoint: "/tv/on_the_air",
			data: airingTV,
			setData: setAiringTV,
		},
	};

	useEffect(() => {
		const fetchShows = async () => {
			setLoading(true);
			setError(null);

			try {
				const popularRes = await tmdbApi.get(
					`/tv/popular?language=${language}`
				);
				setPopularTV(popularRes.data.results);
			} catch (err) {
				console.error("Failed to fetch popular TV shows:", err);
				setPopularTV([]); // or keep it null
			}

			try {
				const topRatedRes = await tmdbApi.get(
					`/tv/top_rated?language=${language}`
				);
				setTopRatedTV(topRatedRes.data.results);
			} catch (err) {
				console.error("Failed to fetch top rated TV shows:", err);
				setTopRatedTV([]);
			}

			try {
				const airingRes = await tmdbApi.get(
					`/tv/on_the_air?language=${language}`
				);
				setAiringTV(airingRes.data.results);
			} catch (err) {
				console.error("Failed to fetch airing TV shows:", err);
				setAiringTV([]);
			}

			setLoading(false);
		};

		fetchShows();
	}, [language]);

	if (loading) {
		return (
			<div className="d-flex justify-content-center align-items-center min-vh-100">
				<div className="loading-spinner" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="container py-5">
				<div className="error-message">
					Error loading TV shows: {error.message}
				</div>
			</div>
		);
	}
	const type = "tv";
	const renderCategory = (categoryKey) => {
		const category = categories[categoryKey];

		return (
			<div key={categoryKey} className="mb-5">
				<SectionTitle
					title={category.title}
					href={`/category/tv/${categoryKey}`}
				/>

				<ShowsSlider
					language={language}
					shows={category.data}
					title={category.title}
					type={type}
				/>
			</div>
		);
	};

	return (
		<div className="tv-shows-container">
			<div className="container-xl py-4">
				<h1 className="page-title mb-5">{t.tvshowsHub}</h1>
				{Object.keys(categories).map((categoryKey) =>
					renderCategory(categoryKey)
				)}
			</div>
		</div>
	);
}
