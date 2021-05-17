import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row, Button, Toast } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";
import "./MealplanContainer.css";
// import ItemsContainer from "../ItemsContainer";
import MealplanFormModal from "../MealplanFormModal";

const MealplanContainer = () => {
	const dispatch = useDispatch();
	const listMealplans = useSelector((state) => state.mealplan.listMealplans);
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);
	const listItems = useSelector((state) => state.item.listItems);
	const attendeeURL = window.location.pathname.split("/")[2];
	const eventId = useSelector((state) => state.event.currentEvent?.id);
	const [items, setItems] = useState("");
	const [errors, setErrors] = useState([]);

	const selectedMealplan = async (mealplanId) => {
		setTargetKey(mealplanId);
		const mealplan = await dispatch(mealplanActions.getMealplan({ mealplanId, attendeeURL }));
		let currentItems = null;
		if (mealplan) currentItems = await dispatch(itemActions.getItems({ mealplanId, attendeeURL }));
		setItems(currentItems);
	};

	const deleteMealplan = async (e) => {
		e.stopPropagation();
		const mealplanId = e.target.id;
		const message = await dispatch(mealplanActions.deleteMealplan({ eventId, attendeeURL, mealplanId }));
		if (message.errors) setErrors(message.errors);
		else await dispatch(itemActions.itemsUnloaded());
	};

	const deleteItem = async (e) => {
		e.stopPropagation();
		const itemId = e.target.id;
		const mealplanId = await dispatch(itemActions.deleteItem({ attendeeURL, itemId }));
		if (mealplanId.errors) setErrors(mealplanId.errors);
		else await dispatch(itemActions.getItems({ mealplanId, attendeeURL }));
	};

	let mealplanNavItemList, mealplans, itemsTab;
	if (listMealplans) {
		mealplans = Object.values(listMealplans);

		mealplanNavItemList = mealplans.map((mealplan, i) => {
			return (
				<Nav.Item key={i}>
					<Nav.Link eventKey={mealplan.id}>
						{mealplan.name} {"   "}
						{isHost && <Button variant="secondary">Edit Name</Button>}
						{isHost && (
							<Button variant="danger" id={mealplan.id} onClick={(e) => deleteMealplan(e)}>
								{" "}
								Delete
							</Button>
						)}
					</Nav.Link>
				</Nav.Item>
			);
		});
	}
	if (listItems) {
		const itemsList = Object.values(listItems);
		itemsTab = itemsList.map((item, i) => {
			return (
				<div className="toast-div" key={i}>
					<Toast key={`toast-${item.id}`}>
						<Toast.Header closeButton={false}>
							<strong className="mr-auto">
								{item.thing}
								{"   "}
								{item.quantity}
								{item.unit}
							</strong>
							<small>{item.whoBring ? `${item.whoBring} will bring` : "Still needed"}</small>
						</Toast.Header>
						<Toast.Body>
							{isHost && <Button variant="secondary"> Edit Item</Button>}
							{item.whoBring === attendeeURL && <Button variant="warning">Can't Bring</Button>}
							{!item.whoBring && <Button variant="success">Bring it</Button>}
							{isHost && (
								<Button variant="danger" id={item.id} onClick={(e) => deleteItem(e)}>
									{" "}
									Delete
								</Button>
							)}
						</Toast.Body>
					</Toast>
				</div>
			);
		});
	}

	const [targetKey, setTargetKey] = useState(itemsTab ? itemsTab[0]?.id : null);
	console.log(items);

	return (
		<>
			{errors && <ul>{errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>}
			<Tab.Container
				transition={false}
				id="mealplan-container"
				activeKey={targetKey}
				onSelect={(mealplanId) => selectedMealplan(mealplanId)}
			>
				<Row>
					<Col sm={4}>
						<Nav variant="pills" className="flex-column">
							{isHost && <MealplanFormModal />}
							{mealplanNavItemList ? mealplanNavItemList : null}
						</Nav>
					</Col>
					<Col sm={6}>
						<Tab.Content>
							<Tab.Pane eventKey={targetKey}>{itemsTab && itemsTab}</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default MealplanContainer;
