import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";

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
		e.stopPropagation();
		e.preventDefault();

		const message = await dispatch(mealplanActions.editMealplan({ name, eventId, attendeeURL, mealplanId }));
		if (message.errors) setErrors(message.errors);
		else {
			await dispatch(itemActions.itemsUnloaded());
			close.click();
		}
	};

	return (
		<Form
			className="mealplan__Form"
			onSubmit={(e) => {
				e.preventDefault();
				if (!document.getElementById("editMealplanButton")) return;
			}}
		>
			{errors.length > 0 && <h5>{errors} </h5>}
			<Form.Group controlId="formBasicMealplanName">
				<Form.Label>Edit Mealplan Name </Form.Label>
				<Form.Control
					type="text"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
						setShow(true);
					}}
					onKeyDown={(e) => {
						if (e.key === " ") {
							setName(
								e.target.value.slice(0, e.target.selectionStart) + " " + e.target.value.slice(e.target.selectionStart)
							);
							setShow(true);
						}
					}}
					required
					minLength="1"
					maxLength="100"
					placeholder="Enter Mealplan Name"
				/>
			</Form.Group>
			{show && (
				<Button id="editMealplanButton" variant="primary" type="submit" onClick={handleSubmit}>
					Update Name
				</Button>
			)}
		</Form>
	);
};
export default EditMealplanForm;
