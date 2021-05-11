import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, Badge, Alert } from "react-bootstrap";
import * as attendeeActions from "../../store/attendee";
import "./AttendeeDetail.css";

const AttendeeDetail = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const [isGoing, setGoing] = useState(attendee.going);
	const [errors, setErrors] = useState([]);
	const currentAttendeeURL = window.location.pathname.split("/")[2];
	const [showAlert, setShowAlert] = useState(false);

	const setGoingStatus = async (attendeeURL) => {
		const going = await dispatch(attendeeActions.setAttendeeGoing(currentAttendeeURL));
		if (going.errors) setErrors(going.errors);
		setGoing(!isGoing);
	};

	const deleteAttendee = async (TargetAttendeeId) => {
		setErrors([]);
		const targetAttendeeId = Number(TargetAttendeeId);
		const deleted = await dispatch(attendeeActions.deleteTargetAttendee({ targetAttendeeId, currentAttendeeURL }));
		if (deleted.errors) setErrors(deleted.errors);
		history.push("/");
	};

	return (
		<Card className="attendee-text-center">
			{<ul>{errors && errors}</ul>}
			<Card.Header className="attendee-card-header">
				{attendee.host === true && <Badge variant="light">Host</Badge>} Name: {attendee?.name}
			</Card.Header>
			<Card.Body className="attendee-card-body">
				{/* <Card.Text className="attendee-card-text">Contact Info: {attendee.contactInfo}</Card.Text> */}
				{isGoing ? (
					<Button variant="success" onClick={setGoingStatus}>
						Going
					</Button>
				) : (
					<Button variant="danger" onClick={setGoingStatus}>
						Not Going
					</Button>
				)}
				<Button variant="warning" onClick={() => setShowAlert(true)}>
					Leave Event
				</Button>
				{showAlert && (
					<Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
						<p>Are you sure you want to leave this Event?</p>
						<Button
							variant="danger"
							onClick={() => {
								setShowAlert(false);
								deleteAttendee(attendee.id);
							}}
						>
							Yes, Leave
						</Button>
					</Alert>
				)}
			</Card.Body>
		</Card>
	);
};
export default AttendeeDetail;
