import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { getEvents, setCurrentEvent } from "../../store/event";
import { setAttendee, setListAttendees, attendeesUnloaded } from "../../store/attendee";
import { setMealplan, setListMealplans, mealplansUnloaded } from "../../store/mealplan";
import { setListItems, itemsUnloaded } from "../../store/item";
import EventQuickLook from "../EventQuickLook";
import Slider from "react-slick";

const Home = () => {
	const dispatch = useDispatch();
	// const loggedIn = useSelector((state) => state.session.user?.id);
	const userName = useSelector((state) => state.session.user?.username);
	const upcomingEvents = useSelector((state) => state.event.upcomingEvents);
	const previousEvents = useSelector((state) => state.event.previousEvents);
	const eventLoaded = useSelector((state) => state.event?.loaded);
	const [eventsLoaded, setEventsLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			let events = await dispatch(getEvents());
			if (events) setEventsLoaded(true);
			dispatch(setCurrentEvent({}));
			dispatch(setAttendee({}));
			dispatch(setListAttendees({}));
			dispatch(attendeesUnloaded());
			dispatch(setMealplan({}));
			dispatch(setListMealplans({}));
			dispatch(mealplansUnloaded());
			dispatch(setListItems({}));
			dispatch(itemsUnloaded());
		})();
	}, [dispatch, eventLoaded]);

	let upcomingEventQuickLooks, previousEventQuickLooks, upcomEvents, prevEvents;

	if (upcomingEvents) {
		upcomEvents = Object.values(upcomingEvents);
		upcomingEventQuickLooks = upcomEvents.map((event, i) => {
			return <EventQuickLook event={event} key={event.id} />;
		});
	}

	if (previousEvents) {
		prevEvents = Object.values(previousEvents);
		previousEventQuickLooks = prevEvents.map((event, i) => {
			return <EventQuickLook event={event} key={event.id} />;
		});
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 1250,
		slidesToScroll: 1,
		slidesToShow: 3,
		adaptiveHeight: false,
	};

	if (!eventsLoaded) return null;
	return (
		<div className="home-page__container">
			<h2 style={{ margin: "0" }}>{` Welcome ${userName}!`}</h2>
			<p />
			{upcomEvents.length <= 1 && <h2>You haven't joined upcoming events yet. Go create or join one!</h2>}
			{upcomEvents.length >= 1 && <h2>Upcoming events:</h2>}
			{upcomEvents.length >= 1 && <Slider {...settings}>{upcomingEventQuickLooks}</Slider>}
			<p />
			{prevEvents.length >= 1 && <h2>Previous events:</h2>}
			{prevEvents.length >= 1 && <Slider {...settings}>{previousEventQuickLooks}</Slider>}
		</div>
	);
};

export default Home;
