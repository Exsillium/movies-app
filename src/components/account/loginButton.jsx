import { Button, Spinner } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import useNewToken from "../../hooks/swr/useNewToken";

export default function LoginButton() {
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
					<span>Connecting to TMDB...</span>
				</>
			) : (
				<>
					<FaSignInAlt className="me-2" />
					<span>Continue with TMDB</span>
				</>
			)}
		</Button>
	);
}
