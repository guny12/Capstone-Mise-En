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

const Landing = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userName = useSelector((state) => state.session.user?.username);

	useEffect(() => {
		const modal = document.querySelector("#LogoButton");
		if (modal) modal.click();
	}, []);

	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) sessionLinks = <ProfileButton user={sessionUser} />;
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
		<div>
			{userName && (
				<>
					<h2>{` Welcome ${userName}!`}</h2>
				</>
			)}
			<h1>Create your Event and start inviting people</h1>
			<EventFormModal />
			<div>{sessionLinks}</div>
		</div>
	);
};

export default Landing;
