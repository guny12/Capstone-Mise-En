import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row, Button } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";
import "./ItemsContainer.css";

const ItemsContainer = () => {
	const dispatch = useDispatch();
	const event = useSelector((state) => state.event.currentEvent);
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const currentMealPlan = useSelector((state) => state.mealplan.currentMealplan);
	const itemLoaded = useSelector((state) => state.item.loaded);

	// grab the list of items when changing the currentMealplan (aka opening one)
	useEffect(() => {
		(async () => {
			if (!itemLoaded && attendeeURL.length === 64) await dispatch(itemActions.getItems({ attendeeURL, mealPlanId }));
		})();
	}, [dispatch, itemLoaded, attendeeURL]);

	return (
		<Tab.Container transition={false} id="mealplan-container" defaultActiveKey="first">
			<Row>
				<Col sm={3}>
					<Nav variant="tabs" className="flex-column">
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

export default ItemsContainer;
