import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Landing.css";
import * as sessionActions from "../../store/session";
import EventFormModal from "../EventFormModal";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import ProfileButton from "../Navigation/ProfileButton";
import { Button } from "react-bootstrap";
import logo from "../../images/mise-en-logo.png";

const Landing = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userName = useSelector((state) => state.session.user?.username);

	useEffect(() => {
		const modal = document.querySelector("#LogoButton");
		if (modal) modal.click();
	}, []);

	const sessionUser = useSelector((state) => state.session.user);

	if (sessionUser) history.push("/home");

	const sessionLinks = (
		<>
			<LoginFormModal />
			<SignUpModal />
			<Button variant="dark" onClick={() => handleSubmit()}>
				Demo User
			</Button>
		</>
	);

	const handleSubmit = async () => {
		await dispatch(sessionActions.login({ credential: "demo@user.iocom", password: "password" }));
		history.push("/home");
	};

	return (
		<div>
			{!userName && (
				<>
					<h1>{` Welcome to Mise-En`}</h1>
					<h2>If you login, you can view all the events you are a part of</h2>
				</>
			)}
			<h2>Create your Event and start inviting people</h2>
			<EventFormModal />
			<div>{!sessionUser && sessionLinks}</div>
		</div>
	);
};

export default Landing;
