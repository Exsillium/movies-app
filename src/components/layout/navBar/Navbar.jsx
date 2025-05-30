import {
	Container,
	Navbar as BsNavbar,
	Nav,
	Form,
	InputGroup,
} from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import AccountDropdown from "./accountDropdown";
import SearchInput from "./SearchInput";


export default function Navbar() {
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
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/movies" className="fw-semibold">
							Movies
						</Nav.Link>
						<Nav.Link as={NavLink} to="/tv" className="fw-semibold">
							TV Shows
						</Nav.Link>
						{sessionId && (
							<Nav.Link as={NavLink} to="/wishlist" className="fw-semibold">
								Wishlist
							</Nav.Link>
						)}
					</Nav>
					<SearchInput />

					<Nav>
						<Nav.Item className="d-flex gap-3 align-items-center">
							<AccountDropdown />
						</Nav.Item>
					</Nav>
				</BsNavbar.Collapse>
			</Container>
		</BsNavbar>
	);
}
