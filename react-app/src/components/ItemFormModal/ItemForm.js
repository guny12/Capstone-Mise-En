import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as itemActions from "../../store/item";

import "./ItemForm.css";
import { Button, Form } from "react-bootstrap";

const ItemForm = () => {
	const dispatch = useDispatch();
	const mealPlanId = useSelector((state) => state.mealplan?.currentMealplan?.id);
	const [errors, setErrors] = useState([]);
	const [thing, setThing] = useState("");
	const [quantity, setQuantity] = useState("");
	const [unit, setUnit] = useState("");
	const [whoBring, setWhoBring] = useState("");
	const [closeAfter, setCloseAfter] = useState(false);
	const attendeeURL = window.location.pathname.split("/")[2];
	const close = document.querySelector("#modal-background");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(itemActions.createItem({ attendeeURL, thing, quantity, unit, whoBring, mealPlanId }));
		if (data?.errors) setErrors(data.errors);
		else if (closeAfter) close.click();
		else {
			setThing("");
			setQuantity("");
			setUnit("");
			setWhoBring("");
			document.getElementById("formCheckBring").checked = false;
			return;
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			{errors.length > 0 && <h5 key="error">{errors} </h5>}
			<Form.Group controlId="formBasicThing">
				<Form.Label>Name of Item</Form.Label>
				<Form.Control
					type="text"
					value={thing}
					onChange={(e) => setThing(e.target.value)}
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
					onChange={(e) => setQuantity(e.target.value)}
					placeholder="Enter quantity of item, whole numbers"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicUnit">
				<Form.Label>Unit of measurement</Form.Label>
				<Form.Control
					type="text"
					value={unit}
					onChange={(e) => setUnit(e.target.value)}
					maxLength="50"
					required
					placeholder="Enter Unit of Measurement"
				/>
			</Form.Group>
			<Form.Group controlId="formCheckBring">
				<Form.Label>Are you bringing it?</Form.Label>
				<Form.Control
					type="checkbox"
					value={whoBring}
					onChange={(e) => (whoBring.length === 0 ? setWhoBring(attendeeURL) : setWhoBring(""))}
				/>
			</Form.Group>
			<Form.Group controlId="formCheckCloseAfter">
				<Form.Label>Close form after?</Form.Label>
				<Form.Control type="checkbox" value={closeAfter} onChange={(e) => setCloseAfter(!closeAfter)} />
			</Form.Group>

			<Button variant="primary" type="submit">
				Create Item
			</Button>
		</Form>
	);
};
export default ItemForm;
