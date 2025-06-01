import { Spinner } from "react-bootstrap";

export default function SpinnerLoader({ message }) {
	return (
		<div className="loading-state text-center">
			<Spinner animation="border" variant="warning" />
			<p className="mt-3 text-muted">{message}</p>
		</div>
	);
}
