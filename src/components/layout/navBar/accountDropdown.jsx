import { useSelector } from "react-redux";
import useAccountData from "../../../hooks/swr/useAccountData";
import { useCallback } from "react";
import { NavLink } from "react-router";
import LogoutButton from "../../account/logoutButton";
import {
	MdAccountCircle,
	MdOutlineLanguage,
	MdOutlineFlag,
	MdPersonOutline,
} from "react-icons/md";
import { Button, Image, NavDropdown } from "react-bootstrap";

export default function AccountDropdown() {
	const sessionId = useSelector((state) => state.sessionId);
	const { isLoading, accountData } = useAccountData(sessionId);
	const getAvatarUrl = useCallback(
		(sizeType = "small") => {
			const size = sizeType === "small" ? 45 : 96; // TMDB sizes (e.g., w45, w185)
			const gravatarSize = sizeType === "small" ? 25 : 50;

			if (accountData?.avatar?.tmdb?.avatar_path) {
				return `https://image.tmdb.org/t/p/w${size}${accountData.avatar.tmdb.avatar_path}`;
			}
			if (accountData?.avatar?.gravatar?.hash) {
				return `https://www.gravatar.com/avatar/${accountData.avatar.gravatar.hash}?s=${gravatarSize}&d=mp`;
			}
			return null;
		},
		[accountData]
	);

	const smallAvatarUrl = getAvatarUrl("small");
	const largeAvatarUrl = getAvatarUrl("large");
	return (
		<>
			{sessionId ? (
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
