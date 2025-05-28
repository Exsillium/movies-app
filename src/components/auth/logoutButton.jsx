import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeSessionId } from "../../store/slice/sessionId";

export default function LogoutButton() {
	const dispatch = useDispatch();

	return (
		<Button onClick={() => dispatch(removeSessionId())} variant="danger">
			Logout
		</Button>
	);
}
