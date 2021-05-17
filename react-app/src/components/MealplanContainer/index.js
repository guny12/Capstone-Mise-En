import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row, Button, Toast } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";
import "./MealplanContainer.css";
// import ItemsContainer from "../ItemsContainer";

const MealplanContainer = () => {
	const dispatch = useDispatch();
	const listMealplans = useSelector((state) => state.mealplan.listMealplans);
	const currentMealPlan = useSelector((state) => state.mealplan.currentMealplan);
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);
	const listItems = useSelector((state) => state.item.listItems);
	const attendeeURL = window.location.pathname.split("/")[2];
	const [items, setItems] = useState("");

	const selectedMealplan = async (mealplanId) => {
		setTargetKey(mealplanId);
		const mealplan = await dispatch(mealplanActions.getMealplan({ mealplanId, attendeeURL }));
		const currentItems = await dispatch(itemActions.getItems({ mealplanId, attendeeURL }));
		setItems(currentItems);
	};

	let mealplanNavItemList, mealplans, itemsTab;
	if (listMealplans) {
		mealplans = Object.values(listMealplans);

		mealplanNavItemList = mealplans.map((mealplan, i) => {
			return (
				<Nav.Item key={i}>
					<Nav.Link eventKey={mealplan.id}>
						{mealplan.name} {"   "}
						{isHost && <Button variant="danger"> Delete</Button>}
					</Nav.Link>
				</Nav.Item>
			);
		});
	}
	if (items) {
		const itemsList = Object.values(listItems);
		itemsTab = itemsList.map((item, i) => {
			return (
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
						{isHost && <Button variant="danger"> Delete</Button>}
					</Toast.Body>
				</Toast>
			);
		});
	}

	const [targetKey, setTargetKey] = useState(itemsTab ? itemsTab[0]?.id : null);
	console.log(items);

	return (
		<Tab.Container
			transition={false}
			id="mealplan-container"
			activeKey={targetKey}
			onSelect={(mealplanId) => selectedMealplan(mealplanId)}
		>
			<Row>
				<Col sm={3}>
					<Nav variant="pills" className="flex-column">
						{mealplanNavItemList ? mealplanNavItemList : null}
					</Nav>
				</Col>
				<Col sm={4}>
					<Tab.Content>
						<Tab.Pane eventKey={targetKey}>{itemsTab && itemsTab}</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MealplanContainer;
