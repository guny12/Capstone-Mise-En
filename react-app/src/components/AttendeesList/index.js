import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./AttendeesList.css";
import { Alert, Badge, Button, Accordion, Card } from "react-bootstrap";
// import * as eventActions from "../../store/event";
// import * as attendeeActions from "../../store/attendee";
import EditAttendeeFormModal from "../EditAttendeeFormModal";

const AttendeesList = () => {
	const listAttendees = useSelector((state) => state.attendee?.listAttendees);
	const totalAttendees = useSelector((state) => state.attendee?.totalAttendees);
	const numGoing = useSelector((state) => state.attendee?.numGoing);
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);
	const [showAlert, setShowAlert] = useState(false);

	const deleteAttendeeConfirm = async (attendeeId) => {};

	let attendees, attendeesList;
	if (listAttendees) {
		attendees = Object.values(listAttendees);
		attendeesList = attendees.map((attendee, i) => {
			return (
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey={attendee.id} className="attendees-accordion-header">
						<span className="accordion-item-name">{attendee.name}</span>{" "}
						{attendee.host === true && <Badge variant="info">Host</Badge>}{" "}
						{attendee.going === true && <Badge variant="success">Going</Badge>}{" "}
						{attendee.going === false && <Badge variant="danger">Not Going</Badge>}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={attendee.id}>
						<Card.Body>
							<p className="accordion-item-contact">
								contact info: {attendee.contactInfo?.length >= 1 ? attendee.contactInfo : "None provided"}
							</p>
							{isHost && <Button variant="info">Make Host</Button>}
							{isHost && (
								<Button variant="danger" onClick={() => setShowAlert(true)}>
									Remove
								</Button>
							)}
							{showAlert && (
								<Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
									<Alert.Heading>Remove {attendee.name}</Alert.Heading>
									<p>Are you sure you want to remove this person?</p>
									<Button variant="danger">Confirm Remove</Button>
								</Alert>
							)}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			);
		});
	}

	if (!attendees) return null;

	return (
		<div className="attendees-accordion-container">
			<h5 className="attendees-accordion-header" key="attendees-accordion-header">
				{totalAttendees} invited, {numGoing} going
			</h5>

			<Accordion>{attendeesList}</Accordion>
		</div>
	);
};

export default AttendeesList;
