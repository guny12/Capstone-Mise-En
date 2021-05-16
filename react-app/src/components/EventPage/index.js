import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./EventPage.css";
// import { Button, Form, Col, Image } from "react-bootstrap";
import * as eventActions from "../../store/event";
import * as attendeeActions from "../../store/attendee";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";
import AttendeeFormModal from "../AttendeeFormModal";
import PageNotFound from "../PageNotFound";
import AttendeesList from "../AttendeesList";
import AttendeeDetail from "../AttendeeDetail";
import EventDetail from "../EventDetail";
import MealplanContainer from "../MealplanContainer";

const EventPage = () => {
	const dispatch = useDispatch();
	const attendeesLoaded = useSelector((state) => state.attendee?.loaded);
	const mealplansLoaded = useSelector((state) => state.mealplan?.loaded);
	const eventLoaded = useSelector((state) => state.event?.loaded);
	const currentEventId = useSelector((state) => state.event?.currentEvent?.id);
	const [eventAndAttendeeLoaded, setEventAndAttendeeLoaded] = useState(false);
	const [exists, setExists] = useState(false);
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const attendeeURL = window.location.pathname.split("/")[2];

	useEffect(() => {
		(async () => {
			try {
				const eventId = await dispatch(attendeeActions.getAttendee(attendeeURL));
				const event = await dispatch(eventActions.getEvent(eventId));
				if (eventId && event) setExists(true);
				setEventAndAttendeeLoaded(true);
			} catch {
				setEventAndAttendeeLoaded(true);
			}
		})();
	}, [dispatch, attendeeURL]);

	// updates the list of attendees if there is a change in creation or deletion.
	useEffect(() => {
		(async () => {
			if (!attendeesLoaded && attendeeURL.length === 64) await dispatch(attendeeActions.getAttendees(attendeeURL));
		})();
	}, [dispatch, attendeesLoaded, attendeeURL]);

	// updates the event if there is a change
	useEffect(() => {
		(async () => {
			if (!eventLoaded && currentEventId) await dispatch(eventActions.getEvent(currentEventId));
		})();
	}, [dispatch, eventLoaded, currentEventId]);

	// updates the list of mealplans if there is a change in creation or deletion.
	// won't auto refresh if someone else changes it on a different page though.
	useEffect(() => {
		(async () => {
			if (!mealplansLoaded && attendeeURL.length === 64) await dispatch(mealplanActions.getMealplans(attendeeURL));
		})();
	}, [dispatch, mealplansLoaded, attendeeURL]);

	// used to close the logo transition modal if it's there.
	useEffect(() => {
		const modal = document.querySelector("#LogoButton");
		if (modal) modal.click();
	}, []);

	if (!eventAndAttendeeLoaded) return null;
	if (!exists && eventAndAttendeeLoaded) return <PageNotFound />;

	// if you are host:
	// list all Attendees for this event, display which ones are going or not X
	// lets you edit event in a modal
	// let you edit menu  and items
	// lets you comment

	// if not host:
	// lets you view attendees, displays who's going and not x
	// lets you edit your attendee info
	// let you edit going or not. X
	// lets you comment

	// if it is 15keyEventPage or user is a host, create attendee button shows
	const attendeeFormModal =
		attendeeURL.length === 15 || (attendeeURL.length === 64 && isHost) ? <AttendeeFormModal /> : null;

	return (
		<div className="Event-Page-Container">
			<EventDetail />
			{attendeeFormModal}
			<MealplanContainer />
			{attendeeURL.length === 64 && attendee && <AttendeeDetail />}
			{attendeeURL.length === 64 && <AttendeesList />}
		</div>
	);
};

export default EventPage;
