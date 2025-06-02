import { Spinner, Container, Card } from "react-bootstrap";
import { FaFilm } from "react-icons/fa";
import useAuthentication from "../hooks/useAuthentiction";
import LoginButton from "../components/account/loginButton";
import SpinnerLoader from "../components/loaders/spinnerLoader";
import { useLanguage } from "../LanguageContext";


export default function LoginPage() {
	const { t } = useLanguage();
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
				className="login-card border-0"
			>
				<Card.Body className="p-md-5 p-4">
					<div className="text-center mb-4">
						<FaFilm size={48} style={{ color: "#FEC61F" }} className="mb-3" />
						<h1 className="login-title  fw-semibold mb-2 fs-2 text-uppcase text-dark">
							{t.welcome}
						</h1>
						<p className="text-muted">
							{t.signin}
						</p>
					</div>

					{isLoading ? (
						<SpinnerLoader message={"Verifying your credentials..."} />
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
