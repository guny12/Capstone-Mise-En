import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Landing.css";
// import { Button, Form, Col } from "react-bootstrap";
import EventForm from "../EventForm";

const Landing = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userName = useSelector((state) => state.session.user?.username);

	useEffect(() => {
		const modal = document.querySelector("#LogoButton");
		if (modal) modal.click();
		console.log(modal);
	}, []);

	return (
		<div>
			{userName && (
				<>
					<h2>{` Welcome ${userName}!`}</h2>
				</>
			)}
			<h1>Create your Event and start inviting people</h1>
			<EventForm />
		</div>
	);
};

export default Landing;
