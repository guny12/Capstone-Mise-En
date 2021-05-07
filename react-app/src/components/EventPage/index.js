import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EventPage.css";
import { Button, Form, Col } from "react-bootstrap";
import * as eventActions from "../../store/event";
import * as attendeeActions from "../../store/attendee";
import AttendeeFormModal from "../AttendeeFormModal";

const EventPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const creatorUserId = useSelector((state) => state.session.user?.id);
	const attendeeURL = window.location.pathname.split("/")[2];

	console.log(attendeeURL, "URL");
	useEffect(() => {
		(async () => {
			const eventId = await dispatch(attendeeActions.getAttendee(attendeeURL));
			const event = await dispatch(eventActions.getEvent(eventId));
		})();
	}, [dispatch]);

	const [errors, setErrors] = useState([]);
	// const [eventName, setEventName] = useState("");
	// const [locationName, setLocationName] = useState("");
	// const [location, setLocation] = useState("");
	// const [description, setDescription] = useState("");
	// const [date, setDate] = useState("");
	// const [startTime, setStartTime] = useState("");
	// const [type, setType] = useState("");
	// const [totalCost, setTotalCost] = useState("");
	// const [availableSpots, setAvailableSpots] = useState("");
	// const [thingsNeeded, setThingsNeeded] = useState("");

	// const [name, setName] = useState("");
	// const [contactInfo, setContactInfo] = useState("");
	// const [attendeeEmail, setAttendeeEmail] = useState("");

	return <h1>{attendeeURL}</h1>;
};

export default EventPage;
