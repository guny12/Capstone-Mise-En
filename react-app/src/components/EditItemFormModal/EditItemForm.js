import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../store/item";
import { Button, Form } from "react-bootstrap";

const EditItemForm = ({ itemId }) => {
	const dispatch = useDispatch();
	const mealPlanId = useSelector((state) => state.mealplan?.currentMealplan?.id);
	const currentItem = useSelector((state) => state.item?.listItems[`${itemId}`]);
	const [errors, setErrors] = useState([]);
	const [show, setShow] = useState(false);
	const [thing, setThing] = useState(currentItem.thing);
	const [quantity, setQuantity] = useState(currentItem.quantity);
	const [unit, setUnit] = useState(currentItem.unit);
	const [whoBring, setWhoBring] = useState(currentItem.whoBring !== null ? currentItem.whoBring : "");
	const attendeeURL = window.location.pathname.split("/")[2];
	const close = document.querySelector("#modal-background");

	const handleSubmit = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		const data = await dispatch(editItem({ attendeeURL, thing, quantity, unit, whoBring, mealPlanId, itemId }));
		if (data?.errors) setErrors(data.errors);
		else if (close) close.click();
	};

	return (
		<Form onSubmit={handleSubmit}>
			{errors.length > 0 && <h5 key="error">{errors} </h5>}
			<Form.Group controlId="formBasicThing">
				<Form.Label>Name of Item</Form.Label>
				<Form.Control
					type="text"
					value={thing}
					onChange={(e) => {
						setShow(true);
						setThing(e.target.value);
					}}
					required
					maxLength="50"
					placeholder="Name of item"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicQuantity">
				<Form.Label>Quantity</Form.Label>
				<Form.Control
					type="number"
					value={quantity}
					required
					min="0"
					max="999999999999"
					onChange={(e) => {
						setShow(true);
						setQuantity(e.target.value);
					}}
					placeholder="Enter quantity of item, whole numbers"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicUnit">
				<Form.Label>Unit of measurement</Form.Label>
				<Form.Control
					type="text"
					value={unit}
					onChange={(e) => {
						setShow(true);
						setUnit(e.target.value);
					}}
					maxLength="50"
					required
					placeholder="Enter Unit of Measurement"
				/>
			</Form.Group>
			{show && (
				<Button variant="primary" type="submit">
					Edit Item
				</Button>
			)}
		</Form>
	);
};
export default EditItemForm;
