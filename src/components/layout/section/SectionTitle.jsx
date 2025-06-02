import React from "react";
import { Link } from "react-router";
import { useLanguage } from "../../../LanguageContext";

export default function SectionTitle({ title, href }) {
	const { t, language } = useLanguage();

	return (
		<div className="d-flex mx-3 align-items-center px-3 pt-5 my-5">
			<h2 className="section-title mb-0">{title}</h2>
			{href && (
				<Link
					to={`${href}`}
					className="category-header d-flex align-items-center text-decoration-none flex-grow-1"
				>
					<button className="btn btn-link ms-3 text-decoration-none text-warning">
						{t.viewAll}
					</button>
				</Link>
			)}
		</div>
	);
}
