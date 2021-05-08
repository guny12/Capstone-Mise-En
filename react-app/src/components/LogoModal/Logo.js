import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./Logo.css";
import { Button, Form } from "react-bootstrap";

const Logo = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			const close = document.querySelector("#Logo-modal-background");
			close.click();
		}, 2700);
	}, []);

	return <img src="mise-en-logo.png" alt="logo"></img>;
};
export default Logo;
