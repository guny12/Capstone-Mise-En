import React from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import "./EventQuickLook.css";

const EventQuickLook = ({ event }) => {
	return (
		<Card variant="dark" bg="dark" text="white" className=" text-center">
			<Card.Header className="event-card-header">
				{event.type && event.type} Event: {event.eventName}
			</Card.Header>
			<Card.Body>
				<Card.Text className="event-card-text">
					<strong>Starts at : </strong>
					{`${event.date.slice(0, 16)},
					${
						Number(event.startTime.slice(0, 2)) > 12
							? "0" + Math.abs(Number(event.startTime.slice(0, 2)) - 12)
							: event.startTime.slice(0, 2)
					}
					${event.startTime.slice(2, 5)}
					${Number(event.startTime.slice(0, 2)) >= 12 ? "PM" : "AM"}`}
				</Card.Text>
				<Card.Text className="event-card-text">
					<strong>Location Name:</strong> {event.locationName}
				</Card.Text>
				<p />
				<Button>Event Page</Button>
			</Card.Body>
			<Card.Footer className="text-muted" text="white">
				<strong>Last updated:</strong> {event.updatedAt}
			</Card.Footer>
		</Card>
	);
};
export default EventQuickLook;
