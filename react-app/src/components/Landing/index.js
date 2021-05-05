import React from "react";
import { useSelector } from "react-redux";
import "./Landing.css";

const Landing = () => {
	const loggedIn = useSelector((state) => state.session.user?.id);
	const userName = useSelector((state) => state.session.user?.username);

	return (
		<div>
			{loggedIn && (
				<>
					<h2>{` Welcome ${userName}!`}</h2>
				</>
			)}
			<h1>Test</h1>
		</div>
	);
};

export default Landing;
