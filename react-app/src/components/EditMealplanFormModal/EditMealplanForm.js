import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as mealplanActions from "../../store/mealplan";

import "./EditMealplanForm.css";
import { Button, Form } from "react-bootstrap";

const EditMealplanForm = () => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const attendeeURL = window.location.pathname.split("/")[2];
	const close = document.querySelector("#modal-background");
	const currentEvent = useSelector((state) => state.event?.currentEvent);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const eventId = currentEvent.id;
		const data = await dispatch(mealplanActions.createMealplan({ name, attendeeURL, eventId }));
		if (data?.errors) setErrors(data.errors);
		else if (close) close.click();
	};

	return (
		<Form onSubmit={handleSubmit} className="mealplan__Form">
			{errors.length > 0 && <h5>{errors} </h5>}
			<Form.Group controlId="formBasicName">
				<Form.Label>Mealplan Name </Form.Label>
				<Form.Control
					type="text"
					autoComplete="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					maxLength="100"
					placeholder="Enter Mealplan Name"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Create Mealplan
			</Button>
		</Form>
	);
};
export default EditMealplanForm;
