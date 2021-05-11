import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Badge } from "react-bootstrap";
import * as attendeeActions from "../../store/attendee";
import "./CurrentAttendeeDetail.css";

const CurrentAttendeeDetail = () => {
	const dispatch = useDispatch();
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	const [isGoing, setGoing] = useState(attendee.going);
	const [errors, setErrors] = useState([]);
	const currentAttendeeURL = window.location.pathname.split("/")[2];

	const setGoingStatus = async (attendeeURL) => {
		const going = await dispatch(attendeeActions.setAttendeeGoing(currentAttendeeURL));
		if (going.errors) setErrors(going.errors);
		setGoing(!isGoing);
	};

	return (
		<Card className="attendee-text-center">
			{
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			}
			<Card.Header>
				{attendee.host === true && <Badge variant="info">Host</Badge>} Name: {attendee?.name}
			</Card.Header>
			<Card.Body>
				<Card.Text className="attendee-text">Contact Info: {attendee.contactInfo}</Card.Text>
				{isGoing ? (
					<Button variant="success" onClick={setGoingStatus}>
						Going
					</Button>
				) : (
					<Button variant="danger" onClick={setGoingStatus}>
						Not Going
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};
export default CurrentAttendeeDetail;
