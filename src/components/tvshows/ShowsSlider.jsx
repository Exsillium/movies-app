import React, { useState } from "react";
import TvShowCard from "./TvShowCard";

export default function ShowsSlider({ shows, title, type, language }) {
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(true);

	const handleScroll = (e) => {
		const container = e.target;
		setShowLeftButton(container.scrollLeft > 0);
		setShowRightButton(
			container.scrollLeft < container.scrollWidth - container.clientWidth - 10
		);
	};

	const scroll = (direction) => {
		const container = document.getElementById(
			`scroll-${title.replace(/\s+/g, "")}`
		);
		const scrollAmount =
			direction === "left" ? -container.clientWidth : container.clientWidth;
		container.scrollBy({ left: scrollAmount, behavior: "smooth" });
	};

	return (
		<div className="show-section position-relative">
			{showLeftButton && (
				<button
					className="nav-button left"
					onClick={() => scroll("left")}
					aria-label="Scroll left"
				>
					←
				</button>
			)}

			{showRightButton && (
				<button
					className="nav-button right"
					onClick={() => scroll("right")}
					aria-label="Scroll right"
				>
					→
				</button>
			)}

			<div
				id={`scroll-${title.replace(/\s+/g, "")}`}
				className="shows-slider"
				onScroll={handleScroll}
			>
				{shows.map((show) => (
					<div key={show.id} className="show-card-wrapper">
						<TvShowCard language={language} show={show} type={type} />
					</div>
				))}
			</div>
		</div>
	);
}
