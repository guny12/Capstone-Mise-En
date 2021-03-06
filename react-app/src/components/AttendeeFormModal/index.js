import React, { useState } from "react";
import { CreateAttendeeModalWrapper } from "../../context/Modal";
import AttendeeForm from "./AttendeeForm";
import { Button } from "react-bootstrap";

function AttendeeFormModal({ eventData }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="AttendeeButton" variant="dark" onClick={() => setShowModal(true)}>
				Create Attendee
			</Button>
			{showModal && (
				<CreateAttendeeModalWrapper onClose={() => setShowModal(false)}>
					<AttendeeForm eventData={eventData} />
				</CreateAttendeeModalWrapper>
			)}
		</>
	);
}

export default AttendeeFormModal;
