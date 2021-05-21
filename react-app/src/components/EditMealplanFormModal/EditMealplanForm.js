import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";

import "./EditMealplanForm.css";
import { Button, Form } from "react-bootstrap";

const EditMealplanForm = ({ eventId, mealplanName }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState("");
	const [show, setShow] = useState(false);
	const [name, setName] = useState(mealplanName);
	const attendeeURL = window.location.pathname.split("/")[2];
	const close = document.querySelector("#modal-background");
	const mealplanId = useSelector((state) => state.mealplan?.currentMealplan?.id);

	const handleSubmit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const message = await dispatch(mealplanActions.editMealplan({ name, eventId, attendeeURL, mealplanId }));
		if (message.errors) setErrors(message.errors);
		else {
			await dispatch(itemActions.itemsUnloaded());
			close.click();
		}
	};

	return (
		<Form className="mealplan__Form">
			{errors.length > 0 && <h5>{errors} </h5>}
			<Form.Group controlId="formBasicName">
				<Form.Label>Mealplan Name </Form.Label>
				<Form.Control
					type="text"
					autoComplete="name"
					value={name}
					onChange={(e) => {
						e.stopPropagation();
						setName(e.target.value);
						setShow(true);
					}}
					required
					minLength="1"
					maxLength="100"
					placeholder="Enter Mealplan Name"
				/>
			</Form.Group>
			{show && (
				<Button variant="primary" onClick={handleSubmit}>
					Update Name
				</Button>
			)}
		</Form>
	);
};
export default EditMealplanForm;
