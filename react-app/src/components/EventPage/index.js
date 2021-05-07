import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EventPage.css";
import { Button, Form, Col, Image } from "react-bootstrap";
import * as eventActions from "../../store/event";
import * as attendeeActions from "../../store/attendee";
import AttendeeFormModal from "../AttendeeFormModal";

const EventPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const creatorUserId = useSelector((state) => state.session.user?.id);
	const [eventAndAttendeeLoaded, setEventAndAttendeeLoaded] = useState(false);
	const [exists, setExists] = useState(false);
	const attendeeURL = window.location.pathname.split("/")[2];
	const [errors, setErrors] = useState([]);

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
	}, [dispatch]);

	let noAttendee = (
		<>
			<Image fluid src={"https://cdn.pixabay.com/photo/2014/04/02/16/29/scream-307414__340.png"}></Image>
			<h1>
				<a href="/" style={{ color: "darkblue" }}>
					<div>
						Whoops! Can't find the attendee or event.
						<p /> It may have been deleted by the admin. <p />
						CLICK HERE to go home.
					</div>
				</a>
			</h1>
		</>
	);

	if (!eventAndAttendeeLoaded) return null;
	if (!exists && eventAndAttendeeLoaded) return noAttendee;

	return <h1>{attendeeURL}</h1>;
};

export default EventPage;
