import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Badge } from "react-bootstrap";
import * as eventActions from "../../store/event";
import "./EventDetail.css";

const EventDetail = () => {
	const dispatch = useDispatch();
	const event = useSelector((state) => state.event.currentEvent);
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const currentAttendeeURL = window.location.pathname.split("/")[2];

	return (
		<Card variant="dark" bg="dark" text="white" className="mb-2 event-text-center">
			<Card.Header className="event-card-header">
				Welcome to {event.type && event.type} Event: {event.eventName}
			</Card.Header>

			<Card.Body>
				<Card.Title>
					{event.availableSpots === null ? "Unlimited" : event.availableSpots} Available Spots Remaining
				</Card.Title>

				<Card.Text className="event-card-text">Description: {event.description}</Card.Text>
				<Card.Text className="event-card-text">
					Starts at :{" "}
					{`${event.date.slice(0, 16)}, ${event.startTime.slice(0, 5)}${
						Number(event.startTime.slice(0, 2)) >= 12 ? "PM" : "AM"
					}`}
				</Card.Text>
				<Card.Text className="event-card-text">Location Name: {event.locationName}</Card.Text>
				<Card.Text className="event-card-text">Location: {event.location}</Card.Text>
				{event.thingsNeeded && <Card.Text className="event-card-text">Things Needed: {event.thingsNeeded}</Card.Text>}
				{event.totalCost && <Card.Text className="event-card-text">Total Cost: {event.totalCost}</Card.Text>}
				{attendee.host && <Button variant="light">Edit Event</Button>}
			</Card.Body>
			<Card.Footer className="text-muted" text="white">
				Last updated: {event.updatedAt}
			</Card.Footer>
		</Card>
	);
};
export default EventDetail;
