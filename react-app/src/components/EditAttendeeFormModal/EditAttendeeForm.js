import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as attendeeActions from "../../store/attendee";

import "./EditAttendeeForm.css";
import { Button, Form } from "react-bootstrap";

const EditAttendeeForm = ({ eventData }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [host, setHost] = useState(false);
	const attendeeURL = window.location.pathname.split("/")[2];

	const close = document.querySelector("#modal-background");
	const currentEvent = useSelector((state) => state.event?.currentEvent);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await dispatch(attendeeActions.createAttendee({ host, currentEvent }));
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
			{attendeeURL.length === 64 && (
				<Form.Group controlId="formCheckHost">
					<Form.Label>Give Host Permission </Form.Label>
					<Form.Control type="checkbox" value={host} onChange={(e) => setHost(!host)} />
				</Form.Group>
			)}
			<Button variant="primary" type="submit">
				Edit Attendee
			</Button>
		</Form>
	);
};
export default EditAttendeeForm;
