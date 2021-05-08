import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./Logo.css";
import { Button, Form } from "react-bootstrap";
import logo from "../../images/mise-en-logo.png";

const Logo = () => {
	const dispatch = useDispatch();
	const attendeeURL = window.location.pathname.split("/")[2];

	useEffect(() => {
		setTimeout(() => {
			const close = document.querySelector("#Logo-modal-background");
			if (close) close.click();
		}, 2700);
	}, []);

	if (attendeeURL) return <img src={logo} alt="logo"></img>;
	return <img src="mise-en-logo.png" alt="logo"></img>;
};
export default Logo;
