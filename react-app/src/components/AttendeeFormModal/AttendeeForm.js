import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as attendeeActions from "../../store/attendee";

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
			setErrors([
				<p key="access-header">Access Link is:</p>,
				<p key="access-link">{`https://mise-en.herokuapp.com/event/${data.newAttendee.attendeeURL}`}</p>,
				<p key="access message">{`Please send that link to ${data.newAttendee.name}. It will give them unique access to this event.`}</p>,
			]);
			setName("");
			setContactInfo("");
			setAttendeeEmail("");
			setHost(false);
			document.getElementById("formCheckHost").checked = false;
			return;
		}
	};

	return (
		<Form onSubmit={handleSubmit} className="loginform__Form">
			{errors.length > 0 && <h5 key="error">{errors} </h5>}
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
