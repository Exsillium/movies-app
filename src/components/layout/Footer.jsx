import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
	return (
		<footer className="bg-dark text-light py-4 text-center">
			<Container>
				<p className="mb-0">
					&copy; {new Date().getFullYear()} Movies App. All Rights Reserved.
				</p>
				<p className="mb-0 small mt-1 text-white-50">
					Your go-to source for movie and TV show information.
				</p>
				{/* You can add more links or social icons here if you wish */}
			</Container>
		</footer>
	);
}
