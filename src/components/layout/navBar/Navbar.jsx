import { Container, Navbar as BsNavbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountDropdown from "./accountDropdown";
import SearchInput from "./SearchInput";
import translations from "../../../translations";

export default function Navbar({
  currentTheme,
  toggleTheme,
  language,
  setLanguage,
}) {
  const t = translations[language];
  const sessionId = useSelector((state) => state.sessionId);

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
          🎬 Movies App
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

          <SearchInput language={language} />

          <Nav className="d-flex align-items-center gap-3">
            <select
              className="language-select"
              value={language}
              onChange={(e) => {
                const newLang = e.target.value;
                setLanguage(newLang);
                localStorage.setItem("language", newLang);
                document.body.setAttribute(
                  "dir",
                  newLang === "ar" ? "rtl" : "ltr"
                );
              }}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
              <option value="zh">ZH</option>
            </select>

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
