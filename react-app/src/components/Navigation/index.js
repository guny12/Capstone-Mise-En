import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import { Nav, Navbar, Button } from "react-bootstrap";
import * as sessionActions from "../../store/session";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import EventFormModal from "../EventFormModal";

const Navigation = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser)
		sessionLinks = (
			<>
				<ProfileButton user={sessionUser} />
				{window.location.pathname === "/home" && <EventFormModal />}
			</>
		);
	else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<SignUpModal />
				<Button variant="dark" onClick={() => handleSubmit()}>
					Demo User
				</Button>
			</>
		);
	}

	const handleSubmit = async () => {
		await dispatch(sessionActions.login({ credential: "demo@user.iocom", password: "password" }));
		history.go(0);
	};

	return (
		<Navbar className="navBar" variant="dark" sticky="top">
			<Nav className="mr-auto">
				<NavLink to={"/"} className="nav-link">
					Home
				</NavLink>
				{sessionLinks}
			</Nav>
		</Navbar>
	);
};

export default Navigation;
