import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Landing.css";
import * as sessionActions from "../../store/session";
import EventFormModal from "../EventFormModal";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
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

	useEffect(() => {
		if (sessionUser) history.push("/home");
	}, [history, sessionUser]);

	const sessionLinks = (
		<div style={{ margin: "20px", marginLeft: "-2vw", display: "flex", justifyContent: "space-evenly", width: "40vw" }}>
			<LoginFormModal />
			<SignUpModal />
			<Button variant="dark" onClick={() => handleSubmit()}>
				Demo User
			</Button>
		</div>
	);

	const handleSubmit = async () => {
		await dispatch(sessionActions.login({ credential: "demo@user.iocom", password: "password" }));
		history.push("/home");
	};

	return (
		<div className="landing__container">
			{!userName && (
				<>
					<img style={{ borderRadius: "50%", margin: "25px", marginTop: "0vh" }} src={logo} alt="logo"></img>
					<h1>{` Welcome to Mise-En`}</h1>
					<h2>If you login, you can view all the events you've joined.</h2>
					<div>{!sessionUser && sessionLinks}</div>
				</>
			)}
			<p />
			<h2>Or just create your Event and start inviting people!</h2>
			<div style={{ margin: "40px", marginLeft: "10vw" }}>
				{" "}
				<EventFormModal />
			</div>
		</div>
	);
};

export default Landing;
