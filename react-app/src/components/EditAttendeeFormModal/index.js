// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditAttendeeForm from "./EditAttendeeForm";
import { Button } from "react-bootstrap";

function EditAttendeeFormModal({ attendee }) {
	const [showModal, setShowModal] = useState(false);

	// const eventDataOk = document.querySelector("#LandingCreateEventButton");
	// if (eventDataOk) eventDataOk.click();

	return (
		<>
			<Button id={`edit-attendee-modal-${attendee.id}`} variant="dark" onClick={() => setShowModal(true)}>
				Edit Attendee
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditAttendeeForm attendee={attendee} />
				</Modal>
			)}
		</>
	);
}

export default EditAttendeeFormModal;
