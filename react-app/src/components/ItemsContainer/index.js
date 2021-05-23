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
	// this will enable massive clicks to make a bunch of calls to the backend
	// but if someone else changes it on another browser this will grab the new changes...
	// will probably need websockets to listen for changes in order to make this cleaner... do later
	useEffect(() => {
		(async () => {
			if (!itemLoaded) await dispatch(itemActions.getItems({ attendeeURL, mealPlanId }));
		})();
	}, [dispatch, itemLoaded]);

	const items = useSelector((state) => state.item.listItems);
	let itemTabPane;
	if (items) {
		itemTabPane = items.map((item, i) => {
			return <h1>{item.thing}</h1>;
		});
	}
	return <Tab.Pane eventKey={mealPlanId}>{itemTabPane}</Tab.Pane>;
};

export default ItemsContainer;
