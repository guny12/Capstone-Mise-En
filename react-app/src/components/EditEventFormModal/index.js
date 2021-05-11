// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditEventForm from "./EventForm";
import { Button } from "react-bootstrap";

function EditEventFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="Edit-Event-form-button" variant="light" onClick={() => setShowModal(true)}>
				Edit Event
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EventForm />
				</Modal>
			)}
		</>
	);
}

export default EditEventFormModal;
