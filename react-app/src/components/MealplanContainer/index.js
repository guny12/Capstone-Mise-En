import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import "./MealplanContainer.css";

const MealplanContainer = () => {
	const dispatch = useDispatch();
	const event = useSelector((state) => state.event.currentEvent);
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const listMealplans = useSelector((state) => state.mealplan.listMealplans);

	console.log(listMealplans);

	let mealplanNavItemList, mealplanTabPaneList, mealplans;
	if (listMealplans) {
		mealplans = Object.values(listMealplans);
		mealplanNavItemList = mealplans.map((mealplan, i) => {
			return (
				<Nav.Item>
					<Nav.Link eventKey={mealplan.id}>{mealplan.name}</Nav.Link>
				</Nav.Item>
			);
		});
		mealplanTabPaneList = mealplans.map((mealplan, i) => {
			return (
				<Tab.Pane eventKey={mealplan.id}>
					<h1>MealPlanItems</h1>
				</Tab.Pane>
			);
		});
	}

	return (
		<Tab.Container transition={false} id="mealplan-container" defaultActiveKey="first">
			<Row>
				<Col sm={3}>
					<Nav variant="pills" className="flex-column">
						{mealplanNavItemList}
					</Nav>
				</Col>
				<Col sm={9}>
					<Tab.Content>{mealplanTabPaneList}</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MealplanContainer;
