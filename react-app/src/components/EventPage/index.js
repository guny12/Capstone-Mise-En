import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EventPage.css";
import { Button, Form, Col, Image } from "react-bootstrap";
import * as eventActions from "../../store/event";
import * as attendeeActions from "../../store/attendee";
import AttendeeFormModal from "../AttendeeFormModal";
import PageNotFound from "../PageNotFound";

const EventPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const UserId = useSelector((state) => state.session.user?.id);
	const [eventAndAttendeeLoaded, setEventAndAttendeeLoaded] = useState(false);
	const [exists, setExists] = useState(false);
	const attendeeURL = window.location.pathname.split("/")[2];
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const eventId = await dispatch(attendeeActions.getAttendee(attendeeURL));
				const event = await dispatch(eventActions.getEvent(eventId));
				const success = await dispatch(attendeeActions.getAttendees(attendeeURL));
				if (eventId && event && success) setExists(true);
				setEventAndAttendeeLoaded(true);
			} catch {
				setEventAndAttendeeLoaded(true);
			}
		})();
	}, [dispatch, attendeeURL]);

	useEffect(() => {
		const modal = document.querySelector("#LogoButton");
		if (modal) modal.click();
	}, []);

	if (!eventAndAttendeeLoaded) return null;
	if (!exists && eventAndAttendeeLoaded) return <PageNotFound />;

	// if you are host:
	// list all Attendees for this event, display which ones are hosts or not.
	// let you edit attendees in a modal
	// lets you edit event in a modal
	//  let you edit menu  and items
	// lets you comment

	// if not host:
	// lets you view attendees
	// lets you edit your attendee info
	// lets you comment
	//

	return (
		<div>
			<AttendeeFormModal />
		</div>
	);
};

export default EventPage;
