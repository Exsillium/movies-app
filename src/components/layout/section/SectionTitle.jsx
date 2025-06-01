import React from "react";
import { Link } from "react-router";

export default function SectionTitle({ title, href }) {
	return (
		<div className="d-flex mx-3 align-items-center mb-4">
			<h2 className="section-title mb-0">{title}</h2>
			{href && (
				<Link
					to={`${href}`}
					className="category-header d-flex align-items-center text-decoration-none flex-grow-1"
				>
					<button
						style={{ marginBottom: "-20px" }}
						className="btn btn-link ms-3 text-decoration-none text-warning"
					>
						View All
					</button>
				</Link>
			)}
		</div>
	);
}
