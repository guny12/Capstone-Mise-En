import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row, Button } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";
import "./ItemsContainer.css";

const ItemsContainer = ({ mealPlanId }) => {
	const dispatch = useDispatch();
	const event = useSelector((state) => state.event.currentEvent);
	const attendeeURL = useSelector((state) => state.attendee.currentAttendee?.attendeeURL);
	const currentMealPlan = useSelector((state) => state.mealplan.currentMealplan);
	const itemLoaded = useSelector((state) => state.item.loaded);

	// grab the list of items when changing the currentMealplan (aka opening one)

	useEffect(() => {
		(async () => {
			if (!itemLoaded) await dispatch(itemActions.getItems({ attendeeURL, mealPlanId }));
		})();
	}, [dispatch, itemLoaded]);

	const items = useSelector((state) => state.item.listItems);
	console.log(items, "GET ITEM");
	let itemTabPane;
	if (items) {
		itemTabPane = items.map((item, i) => {
			return <h1>{item.thing}</h1>;
		});
	}
	return <Tab.Pane eventKey={mealPlanId}>{itemTabPane}</Tab.Pane>;
};

export default ItemsContainer;
