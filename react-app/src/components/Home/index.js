import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import EventFormModal from "../EventFormModal";
import { getEvents } from "../../store/event";

const Home = () => {
	const dispatch = useDispatch();
	const loggedIn = useSelector((state) => state.session.user?.id);
	const userName = useSelector((state) => state.session.user?.username);
	const upcomingEvents = useSelector((state) => state.event.upcomingEvents);
	const previousEvents = useSelector((state) => state.event.previousEvents);
	const eventLoaded = useSelector((state) => state.event?.loaded);
	const [eventsLoaded, setEventsLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			let events = await dispatch(getEvents());
			if (events) setEventsLoaded(true);
		})();
	}, [dispatch, eventLoaded]);

	if (!eventsLoaded) return null;
	return (
		<div className="home-page__container">
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
