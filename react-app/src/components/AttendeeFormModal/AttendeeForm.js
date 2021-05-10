import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as attendeeActions from "../../store/attendee";
import * as eventActions from "../../store/event";

import "./AttendeeForm.css";
import { Button, Form } from "react-bootstrap";

const AttendeeForm = ({ eventData }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const [contactInfo, setContactInfo] = useState("");
	const [attendeeEmail, setAttendeeEmail] = useState("");
	const [host, setHost] = useState(false);
	const attendeeURL = window.location.pathname.split("/")[2];

	const close = document.querySelector("#modal-background");
	const currentEvent = useSelector((state) => state.event?.currentEvent);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await dispatch(
			attendeeActions.createAttendee({ name, contactInfo, attendeeEmail, host, currentEvent })
		);
		if (data?.errors) {
			setErrors(data.errors);
		} else if (attendeeURL.length === 15) {
			history.push(data.newAttendee.attendeeURL);
			history.go(0);
			close.click();
			return;
		} else {
			close.click();
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
				<Form.Label>Optional Attendee Email </Form.Label>
				<Form.Control
					type="email"
					autoComplete="email"
					value={attendeeEmail}
					onChange={(e) => setAttendeeEmail(e.target.value)}
					maxLength="200"
					placeholder="Enter Optional Email"
				/>
			</Form.Group>
			{/* if it's a host URL, they can give host permission */}
			{attendeeURL.length === 64 && (
				<Form.Group controlId="formCheckHost">
					<Form.Label>Give Host Permission </Form.Label>
					<Form.Control type="checkbox" value={host} onChange={(e) => setHost(!host)} />
				</Form.Group>
			)}
			<Button variant="primary" type="submit">
				Create Attendee
			</Button>
		</Form>
	);
};
export default AttendeeForm;
