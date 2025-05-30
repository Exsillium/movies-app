import { useSelector } from "react-redux";
import useAccountData from "../../../hooks/swr/useAccountData";
import { NavLink } from "react-router";
import LogoutButton from "../../account/logoutButton";
import {
	MdAccountCircle,
	MdOutlineLanguage,
	MdOutlineFlag,
	MdPersonOutline,
} from "react-icons/md";
import { Button, Image, NavDropdown } from "react-bootstrap";
import useAvatarUrl from "../../../hooks/useAvatarUrl";

export default function AccountDropdown() {
	const sessionId = useSelector((state) => state.sessionId);

	return (
		<>
			{sessionId ? (
				<AccountDataDropdown />
			) : (
				<NavLink to="/login">
					<Button variant="outline-dark me-2 fw-semibold border-2">
						Login
					</Button>
				</NavLink>
			)}
		</>
	);
}

function AccountDataDropdown() {
	const sessionId = useSelector((state) => state.sessionId);
	const accountData = useSelector((state) => state.accountData);
	const { isLoading } = useAccountData(sessionId);

	const { largeAvatarUrl, smallAvatarUrl } = useAvatarUrl(accountData);
	return (
		<NavDropdown
			title={
				isLoading ? (
					<span className="text-dark">Loading...</span>
				) : (
					<>
						{smallAvatarUrl ? (
							<Image
								src={smallAvatarUrl}
								roundedCircle
								width={30}
								height={30}
								className="me-2"
							/>
						) : (
							<MdAccountCircle size={30} className="text-dark me-1" />
						)}
						{accountData?.username || "Account"}
					</>
				)
			}
			id="user-account-dropdown"
			align="end"
			className="fw-semibold"
		>
			{!isLoading && accountData && (
				<div className="p-3" style={{ minWidth: "280px" }}>
					<div className="d-flex align-items-center mb-3">
						{largeAvatarUrl ? (
							<Image
								src={largeAvatarUrl}
								roundedCircle
								width={50}
								height={50}
								className="me-3 shadow-sm border"
							/>
						) : (
							<MdAccountCircle size={50} className="text-secondary me-3" />
						)}
						<div>
							<h6 className="mb-0 text-dark">{accountData.username}</h6>
							{accountData.name && (
								<small className="text-muted">{accountData.name}</small>
							)}
						</div>
					</div>
					<ul className="list-unstyled mb-0 mt-2 pt-2 border-top small">
						{accountData.id && (
							<li className="mb-2 d-flex align-items-center text-muted">
								<MdPersonOutline
									size={18}
									className="me-2 text-primary flex-shrink-0"
								/>
								<span>ID: {accountData.id}</span>
							</li>
						)}
						{accountData.iso_3166_1 && (
							<li className="mb-2 d-flex align-items-center text-muted">
								<MdOutlineFlag
									size={18}
									className="me-2 text-success flex-shrink-0"
								/>
								<span>Country: {accountData.iso_3166_1}</span>
							</li>
						)}
						{accountData.iso_639_1 && (
							<li className="d-flex align-items-center text-muted">
								<MdOutlineLanguage
									size={18}
									className="me-2 text-info flex-shrink-0"
								/>
								<span>Language: {accountData.iso_639_1.toUpperCase()}</span>
							</li>
						)}
					</ul>
				</div>
			)}
			<NavDropdown.Divider />
			<div className="d-grid px-3 py-2">
				<LogoutButton />
			</div>
		</NavDropdown>
	);
}
