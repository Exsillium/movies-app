import { useState, useEffect } from "react";

export default function useSlidrIntervalCounter(sliderLength, interval) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (sliderLength) {
			const timer = setInterval(() => {
				setCurrentIndex((prevIndex) => {
					return (prevIndex + 1) % sliderLength;
				});
			}, 2000); // Change slide every 5 seconds

			return () => clearInterval(timer);
		}
	}, [sliderLength]);

	return { currentIndex, setCurrentIndex };
}
