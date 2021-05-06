import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EventForm.css";
import { Button, Form, Col } from "react-bootstrap";
import * as eventActions from "../../store/events";
import * as attendeeActions from "../../store/attendee";
import AttendeeFormModal from "../AttendeeFormModal";

const EventForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const creatorUserId = useSelector((state) => state.session.user?.id);

	const [errors, setErrors] = useState([]);
	const [eventName, setEventName] = useState("");
	const [locationName, setLocationName] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [type, setType] = useState("");
	// const [totalCost, setTotalCost] = useState("");
	// const [availableSpots, setAvailableSpots] = useState("");
	// const [thingsNeeded, setThingsNeeded] = useState("");

	const [name, setName] = useState("");
	const [contactInfo, setContactInfo] = useState("");
	const [attendeeEmail, setAttendeeEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		const eventData = {
			eventName,
			locationName,
			location,
			description,
			date,
			startTime,
			type,
			creatorUserId,
		};
		// const userId = creatorUserId;
		// const CheckEventData = await dispatch(eventActions.checkEventData(eventData));
		// if (CheckEventData.errors) return setErrors(CheckEventData.errors);
		// const attendeeData = { name, contactInfo, attendeeEmail, userId };
		// const CheckAttendeeData = await dispatch(attendeeActions.checkAttendeeData(attendeeData));
		// if (CheckAttendeeData.errors) return setErrors(CheckAttendeeData.errors);

		const CurrentEvent = await dispatch(eventActions.createEvent(eventData));
		if (CurrentEvent.errors) setErrors(CurrentEvent.errors);
		else {
			const userId = creatorUserId;
			const currentEvent = CurrentEvent.CurrentEvent;
			const attendeeAndCurrentEventData = { name, contactInfo, attendeeEmail, userId, currentEvent };
			const CurrentAttendee = await dispatch(attendeeActions.createAttendee(attendeeAndCurrentEventData));
			if (CurrentAttendee.errors) setErrors(CurrentAttendee.errors);
		}

		console.log(CurrentEvent, "CURRENT EVENT");
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setEventName("");
		setLocation("");
		setLocationName("");
		setDescription("");
		setDate("");
		setStartTime("");
		setType("");
		setName("");
		setContactInfo("");
		setAttendeeEmail("");
		setErrors([]);
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
					onChange={(e) => setEventName(e.target.value)}
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
			<Form.Row>
				<Form.Group as={Col} controlId="formBasicName">
					<Form.Label>Your Name </Form.Label>
					<Form.Control
						type="text"
						autoComplete="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						maxLength="250"
						placeholder="Enter YourName"
					/>
				</Form.Group>

				<Form.Group as={Col} controlId="formBasicEmail">
					<Form.Label>Your Email </Form.Label>
					<Form.Control
						type="email"
						autoComplete="email"
						value={attendeeEmail}
						onChange={(e) => setAttendeeEmail(e.target.value)}
						required
						maxLength="200"
						placeholder="Enter Your Email"
					/>
				</Form.Group>
			</Form.Row>
			<Form.Group controlId="formBasicContactInfo">
				<Form.Label>Optional Contact Info </Form.Label>
				<Form.Control
					type="text"
					autoComplete="tel"
					value={contactInfo}
					onChange={(e) => setContactInfo(e.target.value)}
					maxLength="250"
					placeholder="Enter Optional Phone Number or other contact info"
				/>
			</Form.Group>
			<Form.Row>
				{/* <AttendeeFormModal eventData={eventData} /> */}
				<Button type="submit">Create Event</Button>
				<Button onClick={(e) => handleCancel(e)}>Clear All</Button>
			</Form.Row>
		</Form>
	);
};

export default EventForm;
