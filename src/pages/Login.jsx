import { Button, Spinner } from "react-bootstrap";

import useAuthentication from "../hooks/useAuthentiction";
import useNewToken from "../hooks/swr/useNewToken";
import LoginButton from "../components/account/loginButton";

export default function LoginPage() {
	const { token, isLoading: isTokenLoading } = useNewToken();
	// get sessionId if the token is valid in the query params
	// and store it in localStorage
	const { isLoading } = useAuthentication();
	return (
		<div>
			<h1>Login Page</h1>
			{isLoading && (
				<div>
					<Spinner animation="border" />
					checking for authentication ...
				</div>
			)}
			<LoginButton />
		</div>
	);
}
