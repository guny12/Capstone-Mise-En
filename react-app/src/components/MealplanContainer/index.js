import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, Tab, Row, Button, Toast } from "react-bootstrap";
import * as mealplanActions from "../../store/mealplan";
import * as itemActions from "../../store/item";
import "./MealplanContainer.css";
import MealplanFormModal from "../MealplanFormModal";
import EditMealplanFormModal from "../EditMealplanFormModal";
import ItemFormModal from "../ItemFormModal";
import EditItemFormModal from "../EditItemFormModal";

const MealplanContainer = () => {
	const dispatch = useDispatch();
	const itemLoaded = useSelector((state) => state.item.loaded);
	const mealplanId = useSelector((state) => state.mealplan?.currentMealplan?.id);
	const listMealplans = useSelector((state) => state.mealplan.listMealplans);
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);
	const attendeeName = useSelector((state) => state.attendee.currentAttendee?.name);
	const listItems = useSelector((state) => state.item.listItems);
	const attendeeURL = window.location.pathname.split("/")[2];
	const eventId = useSelector((state) => state.event.currentEvent?.id);

	useEffect(() => {
		(async () => {
			if (!itemLoaded && mealplanId) await dispatch(itemActions.getItems({ attendeeURL, mealplanId }));
		})();
	}, [dispatch, itemLoaded, mealplanId, attendeeURL]);

	const selectedMealplan = async (mealplanId) => {
		setTargetKey(mealplanId);
		const mealplan = await dispatch(mealplanActions.getMealplan({ mealplanId, attendeeURL }));
		if (mealplan) await dispatch(itemActions.getItems({ mealplanId, attendeeURL }));
	};

	const deleteMealplan = async (e) => {
		e.stopPropagation();
		const mealplanId = e.target.id;
		const message = await dispatch(mealplanActions.deleteMealplan({ eventId, attendeeURL, mealplanId }));
		if (message.errors) window.alert(message.errors);
		else await dispatch(itemActions.itemsUnloaded());
	};

	const deleteItem = async (e) => {
		e.stopPropagation();
		const itemId = e.target.id;
		const mealplanId = await dispatch(itemActions.deleteItem({ attendeeURL, itemId }));
		if (mealplanId.errors) window.alert(mealplanId.errors);
		else await dispatch(itemActions.getItems({ mealplanId, attendeeURL }));
	};

	const setBring = async (e) => {
		e.stopPropagation();
		const itemId = e.target.id;
		const item = await dispatch(itemActions.editItem({ itemId, attendeeURL, changeBring: "changeBring" }));
		if (item.errors) window.alert(item.errors);
		else await dispatch(itemActions.getItems({ mealplanId, attendeeURL }));
	};

	let mealplanNavItemList, mealplans, itemsTab;
	if (listMealplans) {
		mealplans = Object.values(listMealplans);

		mealplanNavItemList = mealplans.map((mealplan, i) => {
			return (
				<Nav.Item key={i}>
					<Nav.Link eventKey={mealplan.id}>
						{mealplan.name}
						{"   "}
						{isHost && <EditMealplanFormModal eventId={eventId} mealplanName={mealplan.name} />}
						{isHost && (
							<Button variant="danger" id={mealplan.id} onClick={(e) => deleteMealplan(e)}>
								<i id={mealplan.id} className="far fa-trash-alt"></i>
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
							<strong className="mr-auto" style={{ color: "black" }}>
								{item.thing}
								{"   "}
								{item.quantity}
								{item.unit}
							</strong>
							<small>{item.whoBring ? `${item.whoBring} will bring` : "Still needed"}</small>
						</Toast.Header>
						<Toast.Body>
							{isHost && <EditItemFormModal itemId={item.id} />}
							{item.whoBring === attendeeName && (
								<Button id={item.id} variant="warning" onClick={(e) => setBring(e)}>
									Won't Bring
								</Button>
							)}
							{!item.whoBring && (
								<Button id={item.id} variant="success" onClick={(e) => setBring(e)}>
									Bring it
								</Button>
							)}
							{isHost && (
								<Button variant="danger" id={item.id} onClick={(e) => deleteItem(e)}>
									{" "}
									<i id={item.id} className="far fa-trash-alt"></i>
								</Button>
							)}
						</Toast.Body>
						<p style={{ fontSize: "medium", marginLeft: "20px", color: "gray" }}>
							{` last updated: ${item.updatedAt.slice(0, 17)}
							${
								Number(item.updatedAt.slice(17, 19)) > 12
									? "0" + Math.abs(Number(item.updatedAt.slice(17, 19)) - 12)
									: item.updatedAt.slice(17, 19)
							}
							${item.updatedAt.slice(19, 22)}
							${Number(item.updatedAt.slice(17, 19)) >= 12 ? "PM" : "AM"}`}
						</p>
					</Toast>
				</div>
			);
		});
	}

	const [targetKey, setTargetKey] = useState(itemsTab ? itemsTab[0]?.id : null);

	return (
		<>
			<Tab.Container
				transition={false}
				id="mealplan-container"
				activeKey={targetKey}
				onSelect={(mealplanId, e) => {
					if (e.type === "keydown" && e.keyCode !== 32) return;
					selectedMealplan(mealplanId);
				}}
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
							<Tab.Pane eventKey={targetKey}>
								{isHost && <ItemFormModal />}
								<div>{itemsTab && itemsTab}</div>
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default MealplanContainer;
