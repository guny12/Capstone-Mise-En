import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import * as attendeeActions from "../../store/attendee";

const CurrentAttendeeDetail = () => {
	const dispatch = useDispatch();
	const attendee = useSelector((state) => state.attendee.currentAttendee);
	console.log(attendee);

	return (
		<Card className="text-center">
			<Card.Header>Name: {attendee?.name}</Card.Header>
			<Card.Body>
				{attendee.going ? <Button variant="success">Going</Button> : <Button variant="danger">Not Going</Button>}
			</Card.Body>
			<Card.Footer className="text-muted">2 days ago</Card.Footer>
		</Card>
	);
};
export default CurrentAttendeeDetail;
