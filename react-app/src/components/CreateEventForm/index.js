import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./CreateEventForm.css";
import { Button, Form, Col } from "react-bootstrap";
import * as eventActions from "../../store/events";

const CreateEventForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userName = useSelector((state) => state.session.user?.username);
	const userId = useSelector((state) => state.session.user?.id);

	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const [locationName, setLocationName] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [type, setType] = useState("");
	// const [totalCost, setTotalCost] = useState("");
	// const [availableSpots, setAvailableSpots] = useState("");
	// const [thingsNeeded, setThingsNeeded] = useState("");
	const [creatorUserId, setCreatorUserId] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		if (userId) setCreatorUserId(userId);
		const eventData = {
			name,
			locationName,
			location,
			description,
			date,
			startTime,
			type,
			// totalCost,
			// availableSpots,
			// thingsNeeded,
			creatorUserId,
		};

		const data = await dispatch(eventActions.createEvent(eventData));
		console.log(data);
		// if (data.errors) setErrors(data.errors);
		// else await dispatch(getEvent(data.eventId));
	};
	const handleCancel = (e) => {
		e.preventDefault();
		history.go(0);
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
					value={name}
					onChange={(e) => setName(e.target.value)}
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
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
					placeholder="Enter Description"
				/>
			</Form.Group>
			<Form.Row>
				<Form.Group as={Col} controlId="formBasicDate">
					<Form.Label>Event Date </Form.Label>
					<Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
				</Form.Group>
				<Form.Group as={Col} controlId="formBasicStartTime">
					<Form.Label>Event Start Time </Form.Label>
					<Form.Control
						type="time"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						required
						placeholder="Enter Start Time"
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formBasicType">
					<Form.Label>Event Type </Form.Label>
					<Form.Control
						type="text"
						value={type}
						onChange={(e) => setType(e.target.value)}
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
					onChange={(e) => setLocationName(e.target.value)}
					required
					maxLength="200"
					placeholder="Enter Location Name"
				/>
			</Form.Group>
			{/* <Form.Group as={Col} controlId="formTotalCost">
					<Form.Label>Event Total Cost </Form.Label>
					<Form.Control
						type="number"
						value={totalCost}
						onChange={(e) => setTotalCost(e.target.value)}
						placeholder="Optional Total Cost"
						min="0"
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formAvailableSpots">
					<Form.Label>Available Spots </Form.Label>
					<Form.Control
						type="number"
						value={availableSpots}
						onChange={(e) => setAvailableSpots(e.target.value)}
						placeholder="Optional Available Spots"
						min="0"
					/>
				</Form.Group> */}

			<Form.Group controlId="formBasicLocation">
				<Form.Label>Location/Address </Form.Label>
				<Form.Control
					as="textarea"
					value={location}
					rows={3}
					onChange={(e) => setLocation(e.target.value)}
					required
					maxLength="400"
					placeholder="Enter Location/Address"
				/>
			</Form.Group>

			{/* <Form.Group controlId="formThingsNeeded">
				<Form.Label>Things Needed </Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					value={thingsNeeded}
					onChange={(e) => setThingsNeeded(e.target.value)}
					placeholder="Optional Things Needed"
				/>
			</Form.Group> */}

			<Button type="submit">Create Event</Button>
		</Form>
	);
};

export default CreateEventForm;
