import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditAttendeeForm from "./EditAttendeeForm";
import { Button } from "react-bootstrap";

// THIS IS NOT IN USE AT ALL. REMOVE LATER ON IF YOU DECIDE NOT TO USE AT ALL
function EditAttendeeFormModal({ attendee }) {
	const [showModal, setShowModal] = useState(false);

	// const eventDataOk = document.querySelector("#LandingCreateEventButton");
	// if (eventDataOk) eventDataOk.click();

	return (
		<>
			<Button id={`edit-attendee-modal-${attendee.id}`} variant="info" onClick={() => setShowModal(true)}>
				Edit
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
