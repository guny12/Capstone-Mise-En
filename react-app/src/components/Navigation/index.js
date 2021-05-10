import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import { Nav, Navbar, Button } from "react-bootstrap";
import * as sessionActions from "../../store/session";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser)
		sessionLinks = (
			<>
				<ProfileButton user={sessionUser} />
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
	};

	return (
		<Navbar className="navBar" variant="dark">
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
