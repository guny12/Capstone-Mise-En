import React from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import "./EventDetail.css";
import EditEventFormModal from "../EditEventFormModal";
import AttendeeFormModal from "../AttendeeFormModal";

const EventDetail = () => {
	const event = useSelector((state) => state.event.currentEvent);
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const attendeeURL = window.location.pathname.split("/")[2];
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);

	const attendeeFormModal =
		attendeeURL.length === 15 || (attendeeURL.length === 64 && isHost) ? <AttendeeFormModal /> : null;

	return (
		<Card variant="dark" bg="dark" text="white" className="mb-2 event-text-center">
			<Card.Header className="event-card-header">
				Welcome to {event.type && event.type} Event: {event.eventName}
			</Card.Header>

			<Card.Body>
				<Card.Title>
					{event.availableSpots === null ? "Unlimited" : event.availableSpots} Available Spots Remaining
				</Card.Title>

				<Card.Text className="event-card-text">
					<strong>Description: </strong> {event.description}
				</Card.Text>
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
				<Card.Text className="event-card-text">
					<strong>Location: </strong> {event.location}
				</Card.Text>
				{event.thingsNeeded && (
					<Card.Text className="event-card-text">
						<strong>Things Needed: </strong>
						{event.thingsNeeded}
					</Card.Text>
				)}
				{event.totalCost > 0 && (
					<Card.Text className="event-card-text">
						<strong>Total Cost: </strong>
						{event.totalCost}
					</Card.Text>
				)}
				{attendee.host && <EditEventFormModal event={event} />}
				<p />
				{attendee.host === true && (
					<p>
						You can send this url to let people create their own attendee:{" "}
						<a href={`${window.location.origin}/event/${attendeeURL.slice(0, 15)}`}>{`${
							window.location.origin
						}/event/${attendeeURL.slice(0, 15)}`}</a>
					</p>
				)}

				{attendeeFormModal}
			</Card.Body>
			<Card.Footer className="text-muted" text="white">
				<strong>Last updated:</strong>
				{`${event.updatedAt.slice(0, 17)}
							${
								Number(event.updatedAt.slice(17, 19)) > 12
									? "0" + Math.abs(Number(event.updatedAt.slice(17, 19)) - 12)
									: event.updatedAt.slice(17, 19)
							}
							${event.updatedAt.slice(19, 22)}
							${Number(event.updatedAt.slice(17, 19)) >= 12 ? "PM" : "AM"}`}
			</Card.Footer>
		</Card>
	);
};
export default EventDetail;
