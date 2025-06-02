import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom"; // fixed import
import { useLanguage } from "../../LanguageContext";
 
export default function Footer() {
	const { t } = useLanguage();
  return (
    <footer
      style={{ background: "linear-gradient(to bottom, #1a1a1a, #000000)" }}
      className="bg-dark text-light py-5"
    >
      <Container>
        <Row className="gy-4">
          <Col md={4} className="text-center text-md-start">
            <h5 className="mb-3">🎬 Movie App</h5>
            <p className="mb-0 text-white-50">{t.tag}</p>
          </Col>
          <Col md={4} className="text-center">
            <h5 className="mb-3">{t.connect}</h5>
            <div className="social-links">
              <a
                href="https://facebook.com/yourprofile"
                className="text-light me-3"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com/yourprofile"
                className="text-light me-3"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com/yourprofile"
                className="text-light me-3"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://github.com/yourprofile"
                className="text-light"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <h5 className="mb-3">{t.links}</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/movies"
                  className="text-white-50 text-decoration-none hover-effect"
                >
                  {t.movies}
                </Link>
              </li>
              <li>
                <Link
                  to="/tv"
                  className="text-white-50 text-decoration-none hover-effect"
                >
                  {t.tvShows}
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="text-white-50 text-decoration-none hover-effect"
                >
                  {t.wishlist}
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4 border-secondary" />
        <div className="text-center text-white-50">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} {t.rights} 🎥
          </p>
        </div>
      </Container>
    </footer>
  );
}
