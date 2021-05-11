// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditEventForm from "./EditEventForm";
import { Button } from "react-bootstrap";

function EditEventFormModal({ event }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="Edit-Event-form-button" variant="light" onClick={() => setShowModal(true)}>
				Edit Event
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditEventForm event={event} />
				</Modal>
			)}
		</>
	);
}

export default EditEventFormModal;
