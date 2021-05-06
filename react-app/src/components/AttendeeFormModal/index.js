// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AttendeeForm from "./AttendeeForm";
import { Button } from "react-bootstrap";

function AttendeeFormModal({ eventData }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="loginButton" variant="dark" onClick={() => setShowModal(true)}>
				Create Event
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AttendeeForm eventData={eventData} />
				</Modal>
			)}
		</>
	);
}

export default AttendeeFormModal;
