import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AttendeesList.css";
import { ListGroup, Badge } from "react-bootstrap";
import * as eventActions from "../../store/event";
import * as attendeeActions from "../../store/attendee";

const AttendeesList = () => {
	const listAttendees = useSelector((state) => state.attendee?.listAttendees);
	const totalAttendees = useSelector((state) => state.attendee?.totalAttendees);
	const numGoing = useSelector((state) => state.attendee?.numGoing);

	let attendees, attendeesList;
	if (listAttendees) {
		attendees = Object.values(listAttendees);

		attendeesList = attendees.map((attendee) => {
			return (
				<ListGroup.Item variant="info" key={attendee.id} action variant="info">
					{attendee.name}
					{attendee.host === true && <Badge variant="light">Host</Badge>}
					{attendee.going === true && <Badge variant="success">Going</Badge>}
					{attendee.going === false && <Badge variant="danger">Not Going</Badge>}
				</ListGroup.Item>
			);
		});
	}

	if (!attendees) return null;

	return <ListGroup>{attendeesList}</ListGroup>;
};

export default AttendeesList;
