import React from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import EventFormModal from "../EventFormModal";

const Home = () => {
	const loggedIn = useSelector((state) => state.session.user?.id);
	const userName = useSelector((state) => state.session.user?.username);

	return (
		<div>
			{loggedIn && (
				<>
					<h2>{` Welcome ${userName}!`}</h2>
					<h1>Create your Event and start inviting people</h1>
					<EventFormModal />
				</>
			)}
		</div>
	);
};

export default Home;
