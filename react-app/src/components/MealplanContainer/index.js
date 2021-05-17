import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row, Button } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import "./MealplanContainer.css";
import ItemsContainer from "../ItemsContainer";

const MealplanContainer = () => {
	const dispatch = useDispatch();
	const listMealplans = useSelector((state) => state.mealplan.listMealplans);
	const currentMealPlan = useSelector((state) => state.mealplan.currentMealplan);
	const attendeeURL = window.location.pathname.split("/")[2];

	const selectedMealplan = async (mealplanId) => {
		setTargetKey(mealplanId);
		const mealplan = await dispatch(mealplanActions.getMealplan({ mealplanId, attendeeURL }));
	};

	console.log(listMealplans);
	let mealplanNavItemList, mealplans;
	if (listMealplans) {
		mealplans = Object.values(listMealplans);
		mealplanNavItemList = mealplans.map((mealplan, i) => {
			return (
				<Nav.Item key={i}>
					<Nav.Link eventKey={mealplan.id}>
						{mealplan.name} <Button variant="danger"> Delete</Button>
					</Nav.Link>
				</Nav.Item>
			);
		});
	}

	const [targetKey, setTargetKey] = useState("");

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
			</Row>
		</Tab.Container>
	);
};

export default MealplanContainer;
