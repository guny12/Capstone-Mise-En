import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./EventQuickLook.css";

const EventQuickLook = ({ event }) => {
	const history = useHistory();

	return (
		<Card variant="dark" bg="dark" text="white" className=" text-center">
			<Card.Header className="event-card-header__quicklook">
				{event.type && event.type} Event: {event.eventName}
			</Card.Header>
			<Card.Body className="event-card-body__quicklook">
				<Card.Text className="event-card-text__quicklook">
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
				<Card.Text className="event-card-text__quicklook">
					<strong>Location Name:</strong> {event.locationName}
				</Card.Text>
				<p />
				<Button
					variant="dark"
					onClick={() => {
						history.push(`event/${event.attendeeURL[0]}`);
					}}
				>
					Event Page
				</Button>
			</Card.Body>
			{/* <Card.Footer className="text-muted" text="white">
				<strong>Last updated:</strong>{event.updatedAt}
			</Card.Footer> */}
		</Card>
	);
};
export default EventQuickLook;
