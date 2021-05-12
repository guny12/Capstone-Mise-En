import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./EditEventForm.css";
import { Button, Form, Col } from "react-bootstrap";
import * as eventActions from "../../store/event";

const EditEventForm = ({ event }) => {
	const dispatch = useDispatch();
	const creatorUserId = useSelector((state) => state.session.user?.id);
	const [errors, setErrors] = useState([]);
	const [eventName, setEventName] = useState(event.eventName);
	const [locationName, setLocationName] = useState(event.locationName);
	const [location, setLocation] = useState(event.location);
	const [description, setDescription] = useState(event.description);
	const [date, setDate] = useState(new Date(event.date).toISOString().slice(0, 10));
	const [startTime, setStartTime] = useState(event.startTime.slice(0, 5));
	const [type, setType] = useState(event.type);
	const [totalCost, setTotalCost] = useState(event.totalCost);
	const [availableSpots, setAvailableSpots] = useState(event.availableSpots);
	const [thingsNeeded, setThingsNeeded] = useState(event.thingsNeeded);
	const [isChanged, setIsChanged] = useState(false);
	const attendeeURL = window.location.pathname.split("/")[2];
	const close = document.querySelector("#modal-background");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const eventId = event.id;
		const eventData = {
			eventName,
			locationName,
			location,
			description,
			date,
			startTime,
			type,
			creatorUserId,
			totalCost,
			availableSpots,
			thingsNeeded,
			eventId,
			attendeeURL,
		};

		const CurrentEvent = await dispatch(eventActions.updateEvent(eventData));
		if (CurrentEvent.errors) setErrors(CurrentEvent.errors);
		else if (close) close.click();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		document.querySelector("#modal-background").click();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<Form.Group controlId="formBasicEventName">
				<Form.Label>Event Name </Form.Label>
				<Form.Control
					type="text"
					value={eventName}
					onChange={(e) => {
						setEventName(e.target.value);
						setIsChanged(true);
					}}
					required
					maxLength="100"
					placeholder="Enter Event Name"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicDescription">
				<Form.Label>Event Description </Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					style={{ resize: "none" }}
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
						setIsChanged(true);
					}}
					required
					placeholder="Enter Description"
				/>
			</Form.Group>
			<Form.Row>
				<Form.Group as={Col} controlId="formBasicDate">
					<Form.Label>Event Date </Form.Label>
					<Form.Control
						type="date"
						value={date}
						onChange={(e) => {
							setDate(e.target.value);
							setIsChanged(true);
						}}
						required
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formBasicStartTime">
					<Form.Label>Event Start Time </Form.Label>
					<Form.Control
						type="time"
						value={startTime}
						onChange={(e) => {
							setStartTime(e.target.value);
							setIsChanged(true);
						}}
						required
						placeholder="Enter Start Time"
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formBasicType">
					<Form.Label>Event Type </Form.Label>
					<Form.Control
						type="text"
						value={type}
						onChange={(e) => {
							setType(e.target.value);
							setIsChanged(true);
						}}
						required
						placeholder="Enter Event Type"
					/>
				</Form.Group>{" "}
			</Form.Row>
			<Form.Group controlId="formBasicLocationName">
				<Form.Label>Location Name </Form.Label>
				<Form.Control
					type="text"
					value={locationName}
					onChange={(e) => {
						setLocationName(e.target.value);
						setIsChanged(true);
					}}
					required
					maxLength="200"
					placeholder="Enter Location Name"
				/>
			</Form.Group>
			<Form.Group as={Col} controlId="formTotalCost">
				<Form.Label>Event Total Cost </Form.Label>
				<Form.Control
					type="number"
					step="0.01"
					value={totalCost}
					onChange={(e) => {
						setTotalCost(e.target.value);
						setIsChanged(true);
					}}
					placeholder="Optional Total Cost"
					min="0"
				/>
			</Form.Group>
			<Form.Group as={Col} controlId="formAvailableSpots">
				<Form.Label>Available Spots </Form.Label>
				<Form.Control
					type="number"
					value={availableSpots}
					onChange={(e) => {
						setAvailableSpots(e.target.value);
						setIsChanged(true);
					}}
					placeholder="Optional Available Spots"
					min="0"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicLocation">
				<Form.Label>Location/Address </Form.Label>
				<Form.Control
					as="textarea"
					value={location}
					style={{ resize: "none" }}
					rows={3}
					onChange={(e) => {
						setLocation(e.target.value);
						setIsChanged(true);
					}}
					required
					maxLength="400"
					placeholder="Enter Location/Address"
				/>
			</Form.Group>
			<Form.Group controlId="formThingsNeeded">
				<Form.Label>Things Needed </Form.Label>
				<Form.Control
					as="textarea"
					style={{ resize: "none" }}
					rows={3}
					value={thingsNeeded}
					onChange={(e) => {
						setThingsNeeded(e.target.value);
						setIsChanged(true);
					}}
					placeholder="Optional Things Needed"
				/>
			</Form.Group>
			<Form.Row>
				{isChanged && (
					<Button type="submit" variant="secondary">
						Update Event
					</Button>
				)}
				<Button onClick={(e) => handleCancel(e)} variant="warning">
					Cancel
				</Button>
			</Form.Row>
		</Form>
	);
};

export default EditEventForm;
