import React, { useEffect } from "react";
import "./Logo.css";
import logo from "../../images/mise-en-logo.png";

const Logo = () => {
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
