import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { getEvents } from "../../store/event";
import EventQuickLook from "../EventQuickLook";
import Slider from "react-slick";

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

	let upcomingEventQuickLooks;
	if (upcomingEvents) {
		let events = Object.values(upcomingEvents);
		upcomingEventQuickLooks = events.map((event, i) => {
			return <EventQuickLook event={event} key={event.id} />;
		});
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 1250,
		slidesToScroll: 1,
		slidesToShow: 3,
		adaptiveHeight: true,
	};

	if (!eventsLoaded) return null;
	return (
		<div className="home-page__container">
			<h2>{` Welcome ${userName}!`}</h2>
			<p />
			{upcomingEvents && <h2>Upcoming events:</h2>}
			{upcomingEvents && <Slider {...settings}>{upcomingEventQuickLooks}</Slider>}
		</div>
	);
};

export default Home;
