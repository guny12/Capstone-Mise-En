import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as attendeeActions from "../../store/attendee";

import "./EditAttendeeForm.css";
import { Button, Form } from "react-bootstrap";

// THIS IS NOT IN USE AT ALL. REMOVE LATER ON IF YOU DECIDE NOT TO USE AT ALL
const EditAttendeeForm = () => {
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
		<Form onSubmit={handleSubmit} className="editAttendee__Form">
			{errors.length > 0 && <h2>{errors} </h2>}
			{attendeeURL.length === 64 && (
				<Form.Group controlId="formCheckHost">
					<Form.Label>Give Host Permission </Form.Label>
					<Form.Control type="checkbox" value={host} onChange={(e) => setHost(!host)} />
				</Form.Group>
			)}
			<Button variant="primary" type="submit">
				Save Changes
			</Button>
		</Form>
	);
};
export default EditAttendeeForm;
