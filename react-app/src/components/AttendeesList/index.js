import React /*{ useEffect, useState }*/ from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./AttendeesList.css";
import { ListGroup, Badge } from "react-bootstrap";
// import * as eventActions from "../../store/event";
// import * as attendeeActions from "../../store/attendee";

const AttendeesList = () => {
	const listAttendees = useSelector((state) => state.attendee?.listAttendees);
	const totalAttendees = useSelector((state) => state.attendee?.totalAttendees);
	const numGoing = useSelector((state) => state.attendee?.numGoing);

	let attendees, attendeesList;
	if (listAttendees) {
		attendees = Object.values(listAttendees);

		attendeesList = attendees.map((attendee, i) => {
			return (
				<ListGroup.Item key={i} action variant="dark">
					<span className="list-group-item-name"> {attendee.name}</span>
					{attendee.host === true && <Badge variant="light">Host</Badge>}
					{attendee.going === true && <Badge variant="success">Going</Badge>}
					{attendee.going === false && <Badge variant="danger">Not Going</Badge>}
				</ListGroup.Item>
			);
		});
	}

	if (!attendees) return null;

	return (
		<div className="attendees-list-container">
			<h5 className="attendees-list-header">
				{totalAttendees} attendees, {numGoing} going
			</h5>

			<ListGroup>{attendeesList}</ListGroup>
		</div>
	);
};

export default AttendeesList;
