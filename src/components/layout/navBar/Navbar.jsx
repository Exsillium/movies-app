import { Container, Navbar as BsNavbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountDropdown from "./accountDropdown";
import SearchInput from "./SearchInput";
import { useLanguage } from "../../../LanguageContext";

export default function Navbar({ currentTheme, toggleTheme }) {
	const sessionId = useSelector((state) => state.sessionId);

	const { language, setLanguage, t, setApiLanguage } = useLanguage();

	function handleLanguageChange(e) {
		const newLang = e.target.value;

		setLanguage(newLang);
		setApiLanguage && setApiLanguage(newLang);

		localStorage.setItem("language", newLang);
		document.body.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
	}

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
			<Container className="px-2">
				<BsNavbar.Brand as={NavLink} to="/" className="m-0 fw-bold fs-4">
					🎬 Movies App
				</BsNavbar.Brand>
				<BsNavbar.Toggle aria-controls="basic-navbar-nav" />
				<BsNavbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto  px-lg-0 px-4">
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
					<SearchInput language={language} />

					<Nav className="px-4 px-lg-0">
						<select
							style={{ maxWidth: "100px" }}
							className="language-select  my-2"
							value={language}
							onChange={handleLanguageChange}
						>
							<option value="en">EN</option>
							<option value="fr">FR</option>
							<option value="ar">AR</option>
							<option value="zh">ZH</option>
						</select>
					</Nav>
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
