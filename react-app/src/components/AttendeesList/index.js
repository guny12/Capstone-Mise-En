import React /*{ useEffect, useState }*/ from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./AttendeesList.css";
import { ListGroup, Badge, Button } from "react-bootstrap";
// import * as eventActions from "../../store/event";
// import * as attendeeActions from "../../store/attendee";
import EditAttendeeFormModal from "../EditAttendeeFormModal";

const AttendeesList = () => {
	const listAttendees = useSelector((state) => state.attendee?.listAttendees);
	const totalAttendees = useSelector((state) => state.attendee?.totalAttendees);
	const numGoing = useSelector((state) => state.attendee?.numGoing);
	const isHost = useSelector((state) => state.attendee.currentAttendee?.host);

	let attendees, attendeesList;
	if (listAttendees) {
		attendees = Object.values(listAttendees);
		attendeesList = attendees.map((attendee, i) => {
			return (
				<>
					<ListGroup.Item
						key={`list-group-item-${i}`}
						id={`${attendee.id}`}
						action
						variant="dark"
						onClick={(e) => document.getElementById(`edit-attendee-modal-${e.target.id}`).click()}
					>
						<span className="list-group-item-name" id={`${attendee.id}`}>
							{attendee.name}
						</span>
						{attendee.host === true && (
							<Badge variant="light" id={`${attendee.id}`}>
								Host
							</Badge>
						)}
						{attendee.going === true && (
							<Badge variant="success" id={`${attendee.id}`}>
								Going
							</Badge>
						)}
						{attendee.going === false && (
							<Badge variant="danger" id={`${attendee.id}`}>
								Not Going
							</Badge>
						)}
					</ListGroup.Item>
					<EditAttendeeFormModal attendee={attendee} key={`edit-component-${i}`} />
				</>
			);
		});
	}

	if (!attendees) return null;

	return (
		<div className="attendees-list-container">
			<h5 className="attendees-list-header" key="attendee-list-header">
				{totalAttendees} invited, {numGoing} going
			</h5>

			<ListGroup>{attendeesList}</ListGroup>
		</div>
	);
};

export default AttendeesList;
