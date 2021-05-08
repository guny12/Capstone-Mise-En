import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./Logo.css";
import { Button, Form } from "react-bootstrap";

const Logo = () => {
	const dispatch = useDispatch();
	const close = document.querySelector("#modal-background");

	return <img src="mise-en-logo.png" alt="logo"></img>;
};
export default Logo;
