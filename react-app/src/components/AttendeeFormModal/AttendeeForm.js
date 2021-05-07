import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as attendeeActions from "../../store/attendee";
import * as eventActions from "../../store/event";

import "./AttendeeForm.css";
import { Button, Form } from "react-bootstrap";

const AttendeeForm = ({ eventData }) => {
	// const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const [contactInfo, setContactInfo] = useState("");
	const [attendeeEmail, setAttendeeEmail] = useState("");

	const close = document.querySelector("#modal-background");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const event = await dispatch(eventActions.createEvent(eventData));
		if (event.errors) setErrors(event.errors);
		const data = await dispatch(attendeeActions.createAttendee({ name, contactInfo, attendeeEmail }));
		if (data?.errors) {
			setErrors(data.errors);
		} else {
			close.click();
			console.log(data);
			return;
		}
	};

	return (
		<Form onSubmit={handleSubmit} className="loginform__Form">
			{errors.length > 0 && <h2>{errors} </h2>}
			<Form.Group controlId="formBasicName">
				<Form.Label>Attendee Name </Form.Label>
				<Form.Control
					type="text"
					autoComplete="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					maxLength="250"
					placeholder="Enter Attendee Name"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicContactInfo">
				<Form.Label>Optional Contact Info </Form.Label>
				<Form.Control
					type="text"
					autoComplete="tel"
					value={contactInfo}
					onChange={(e) => setContactInfo(e.target.value)}
					maxLength="250"
					placeholder="Enter Optional Phone Number or other contact info"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Attendee Email </Form.Label>
				<Form.Control
					type="email"
					autoComplete="email"
					value={attendeeEmail}
					onChange={(e) => setAttendeeEmail(e.target.value)}
					required
					maxLength="200"
					placeholder="Enter Email"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Create Event
			</Button>
		</Form>
	);
};
export default AttendeeForm;
