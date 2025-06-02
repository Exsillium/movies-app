import { Button, Spinner } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import useNewToken from "../../hooks/swr/useNewToken";
import translations from "../../translations";

export default function LoginButton({language}) {
	const t = translations[language] || translations.en;
	const { token, isLoading: isTokenLoading } = useNewToken();

	return (
		<Button
			href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/login`}
			className="login-button fw-bold text-dark px-2 py-3"
			variant="warning"
			size="lg"
			disabled={isTokenLoading}
		>
			{isTokenLoading ? (
				<>
					<Spinner
						as="span"
						animation="border"
						size="sm"
						role="status"
						aria-hidden="true"
						className="me-2"
					/>
					<span>{t.connecting}</span>
				</>
			) : (
				<>
					<FaSignInAlt className="me-2" />
					<span>{t.continue}</span>
				</>
			)}
		</Button>
	);
}
