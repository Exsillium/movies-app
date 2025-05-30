import { Spinner, Container, Card } from "react-bootstrap";
import { FaFilm } from "react-icons/fa";

import useAuthentication from "../hooks/useAuthentiction";
import LoginButton from "../components/account/loginButton";

export default function LoginPage() {
	const { isLoading } = useAuthentication();

	return (
		<div
			style={{
				background:
					"linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))",

				backgroundColor: " #888",
				marginBottom: "100px",
			}}
			className="mt-3  d-flex align-items-center justify-content-center"
		>
			<Card
				style={{
					boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
					maxWidth: "480px",
					width: "90%",
					transform: "translateY(10vh)",
				}}
				className=" border-0"
			>
				<Card.Body className="p-md-5 p-4">
					<div className="text-center mb-4">
						<FaFilm size={48} style={{ color: "#FEC61F" }} className="mb-3" />
						<h1 className="login-title  fw-semibold mb-2 fs-2 text-uppcase text-dark">
							Welcome to Movie App
						</h1>
						<p className="text-muted">
							Sign in with your TMDB account to access your personalized movie
							experience
						</p>
					</div>

					{isLoading ? (
						<div className="loading-state text-center">
							<Spinner animation="border" variant="warning" />
							<p className="mt-3 text-muted">Verifying your credentials...</p>
						</div>
					) : (
						<div className="d-grid">
							<LoginButton />
						</div>
					)}
				</Card.Body>
			</Card>
		</div>
	);
}
