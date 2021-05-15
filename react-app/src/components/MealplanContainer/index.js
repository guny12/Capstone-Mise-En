import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import "./MealplanContainer.css";

const MealplanContainer = () => {
	const dispatch = useDispatch();
	const event = useSelector((state) => state.event.currentEvent);
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const mealplans = useSelector((state) => state.mealplan.listMealplans);

	console.log(mealplans);
	return (
		<Tab.Container transition={false} id="mealplan-container" defaultActiveKey="first">
			<Row>
				<Col sm={3}>
					<Nav variant="tabs" className="flex-column">
						<Nav.Item>
							<Nav.Link eventKey="mealplanId">MealPlanName</Nav.Link>
						</Nav.Item>
					</Nav>
				</Col>
				<Col sm={9}>
					<Tab.Content>
						<Tab.Pane eventKey="mealplanId">
							<h1>MealPlanItems</h1>
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MealplanContainer;
