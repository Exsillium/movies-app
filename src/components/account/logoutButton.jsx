import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeSessionId } from "../../store/slice/sessionId";
import { removeAccountData } from "../../store/slice/accountData";

export default function LogoutButton() {
	const dispatch = useDispatch();

	return (
		<Button
			onClick={() => {
				dispatch(removeSessionId());
				dispatch(removeAccountData());
			}}
			variant="danger"
		>
			Logout
		</Button>
	);
}
