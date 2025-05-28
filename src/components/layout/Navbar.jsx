import { Container } from "react-bootstrap";
import LogoutButton from "../auth/logoutButton";
import useAccountData from "../../hooks/swr/useAccountData";
import LoginButton from "../auth/loginButton";
import useSessionId from "../../hooks/swr/useNewSessionId";
import { useSelector } from "react-redux";

export default function Navbar() {
	const sessionId = useSelector((state) => state.sessionId);
	const { isLoading, accountData } = useAccountData(sessionId);
	console.log("sessionId:", sessionId);

	return (
		<div
			style={{
				background: "#fec61fdd",
				// background: "#2c3e50dd",

				backdropFilter: "blur(10px)",
				zIndex: 1,
			}}
			className={`position-sticky top-0  `}
		>
			<Container>
				<div className="navbar    d-flex justify-content-between ">
					<div>Navbar</div>
					<div>
						<span>{sessionId ? <LogoutButton /> : <LoginButton />}</span>
					</div>
				</div>
			</Container>
		</div>
	);
}
