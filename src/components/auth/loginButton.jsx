import { Button, Spinner } from "react-bootstrap";
import useNewToken from "../../hooks/swr/useNewToken";

export default function LoginButton() {
	const { token, isLoading: isTokenLoading } = useNewToken();
	return (
		<Button
			href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/login`}
			// style={{ background: "#2c3e50" }}
			variant="dark"
		>
			{isTokenLoading && <Spinner animation="border" role="status" />}Login
		</Button>
	);
}
