import React from "react";

export default function SectionTitle({ title }) {
	return (
		<h2 className="section-title mb-4 mx-3" data-testid="section-title">
			{title}
		</h2>
	);
}
