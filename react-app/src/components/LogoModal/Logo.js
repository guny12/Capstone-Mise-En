import React, { useEffect } from "react";
import "./Logo.css";
import logo from "../../images/mise-en-logo.png";

const Logo = () => {
	useEffect(() => {
		setTimeout(() => {
			const close = document.querySelector("#Logo-modal-background");
			if (close) close.click();
		}, 2700);
	}, []);

	return <img src={logo} alt="logo"></img>;
};
export default Logo;
