import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeSessionId } from "../../store/slice/sessionId";
import { removeAccountData } from "../../store/slice/accountData";
import { useLanguage } from "../../LanguageContext";

export default function LogoutButton() {
	const { t } = useLanguage();
	const dispatch = useDispatch();

	return (
		<Button
			onClick={() => {
				dispatch(removeSessionId());
				dispatch(removeAccountData());
			}}
			variant="danger"
		>
			{t.logout}
		</Button>
	);
}
