import { Container, Navbar as BsNavbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountDropdown from "./accountDropdown";
import SearchInput from "./SearchInput";
import { useLanguage } from "../../../LanguageContext";
import LangToggler from "./LangToggler";

export default function Navbar({ currentTheme, toggleTheme }) {
	const sessionId = useSelector((state) => state.sessionId);

	const { language, t } = useLanguage();

	return (
		<BsNavbar
			expand="lg"
			sticky="top"
			className="shadow-sm"
			style={{
				background: "rgba(254, 198, 31, 0.95)",
				backdropFilter: "blur(10px)",
			}}
		>
			<Container>
				<BsNavbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
					{t.appname}
				</BsNavbar.Brand>
				<BsNavbar.Toggle aria-controls="basic-navbar-nav" />
				<BsNavbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/" className="fw-semibold">
							{t.home}
						</Nav.Link>
						<Nav.Link as={NavLink} to="/movies" className="fw-semibold">
							{t.movies}
						</Nav.Link>
						<Nav.Link as={NavLink} to="/tv" className="fw-semibold">
							{t.tvShows}
						</Nav.Link>
						{sessionId && (
							<Nav.Link as={NavLink} to="/wishlist" className="fw-semibold">
								{t.wishlist}
							</Nav.Link>
						)}
					</Nav>

					<SearchInput />

					{sessionId && <LangToggler />}
					<Nav className="px-4 px-lg-0">
						<AccountDropdown
							language={language}
							currentTheme={currentTheme}
							toggleTheme={toggleTheme}
						/>
					</Nav>
				</BsNavbar.Collapse>
			</Container>
		</BsNavbar>
	);
}
