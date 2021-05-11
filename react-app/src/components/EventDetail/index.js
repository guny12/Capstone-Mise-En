import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Badge } from "react-bootstrap";
import * as eventActions from "../../store/event";
import "./EventDetail.css";

const EventDetail = () => {
	const dispatch = useDispatch();
	const event = useSelector((state) => state.event.currentEvent);
	const [errors, setErrors] = useState([]);
	const currentAttendeeURL = window.location.pathname.split("/")[2];

	return (
		<Card className="event-text-center" variant="dark" bg="dark" text="white" className="mb-2">
			{
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			}
			<Card.Header className="event-card-header">Welcome to Event: {event.eventName}</Card.Header>

			<Card.Body>
				<Card.Title>{event.availableSpots === null ? "Unlimited" : event.availableSpots} Spots Left</Card.Title>
				<Card.Text className="event-card-text">{event.description}</Card.Text>
			</Card.Body>
			<Card.Footer className="text-muted" text="white">
				Last updated: {event.updatedAt}
			</Card.Footer>
		</Card>
	);
};
export default EventDetail;
