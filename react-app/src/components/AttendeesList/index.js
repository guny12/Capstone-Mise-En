import React /*{ useEffect, useState }*/ from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./AttendeesList.css";
import { ListGroup, Badge, Popover, OverlayTrigger } from "react-bootstrap";
// import * as eventActions from "../../store/event";
// import * as attendeeActions from "../../store/attendee";
// import Popover from "../PopOver";

const AttendeesList = () => {
	const listAttendees = useSelector((state) => state.attendee?.listAttendees);
	const totalAttendees = useSelector((state) => state.attendee?.totalAttendees);
	const numGoing = useSelector((state) => state.attendee?.numGoing);
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);

	let attendees, attendeesList;
	if (listAttendees) {
		attendees = Object.values(listAttendees);
		if (isHost) {
			const ref = attendees.map((attendee, i) => (i = React.createRef()));
			attendeesList = attendees.map((attendee, i) => {
				return (
					<OverlayTrigger
						trigger="click"
						placement="right"
						overlay={
							<Popover id="popover-basic">
								<Popover.Title as="h3">{attendee.name}</Popover.Title>
								<Popover.Content>
									<strong>Remove Attendee</strong> REMOVE
								</Popover.Content>
							</Popover>
						}
						key={`${i}-overlay`}
					>
						<ListGroup.Item key={i} action variant="dark" ref={ref[i]}>
							<span className="list-group-item-name"> {attendee.name}</span>
							{attendee.host === true && <Badge variant="light">Host</Badge>}
							{attendee.going === true && <Badge variant="success">Going</Badge>}
							{attendee.going === false && <Badge variant="danger">Not Going</Badge>}
						</ListGroup.Item>
					</OverlayTrigger>
				);
			});
		} else {
			attendeesList = attendees.map((attendee, i) => {
				return (
					<ListGroup.Item key={`${i}-list-group-item`} action variant="dark">
						<span className="list-group-item-name"> {attendee.name}</span>
						{attendee.host === true && <Badge variant="light">Host</Badge>}
						{attendee.going === true && <Badge variant="success">Going</Badge>}
						{attendee.going === false && <Badge variant="danger">Not Going</Badge>}
					</ListGroup.Item>
				);
			});
		}
	}

	if (!attendees) return null;

	return (
		<div className="attendees-list-container">
			<h5 className="attendees-list-header">
				{totalAttendees} invited, {numGoing} going
			</h5>

			<ListGroup>{attendeesList}</ListGroup>
		</div>
	);
};

export default AttendeesList;
