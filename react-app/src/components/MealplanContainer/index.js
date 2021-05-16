import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row, Button } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import "./MealplanContainer.css";
import ItemsContainer from "../ItemsContainer";

const MealplanContainer = () => {
	const dispatch = useDispatch();
	const event = useSelector((state) => state.event.currentEvent);
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const listMealplans = useSelector((state) => state.mealplan.listMealplans);
	const currentMealPlan = useSelector((state) => state.mealplan.currentMealplan);
	const [targetKey, setTargetKey] = useState("first");

	console.log(listMealplans);

	let mealplanNavItemList, itemTabPaneList, mealplans;
	if (listMealplans) {
		mealplans = Object.values(listMealplans);
		mealplanNavItemList = mealplans.map((mealplan, i) => {
			return (
				<Nav.Item>
					<Nav.Link eventKey={i === 0 ? "first" : mealplan.id}>
						{mealplan.name} <Button> Delete</Button>
					</Nav.Link>
				</Nav.Item>
			);
		});
		itemTabPaneList = mealplans.map((mealplan, i) => {
			return <ItemsContainer mealPlanId={mealplan.id} />;
		});
	}

	return (
		<Tab.Container
			transition={false}
			id="mealplan-container"
			activeKey={targetKey}
			onSelect={(select) => setTargetKey(select)}
		>
			<Row>
				<Col sm={3}>
					<Nav variant="tabs" className="flex-column">
						{mealplanNavItemList}
					</Nav>
				</Col>
				<Col sm={9}>
					<Tab.Content>{itemTabPaneList}</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MealplanContainer;
