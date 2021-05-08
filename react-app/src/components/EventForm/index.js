// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EventForm from "./EventForm";
import { Button } from "react-bootstrap";

function EventFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="loginButton" variant="dark" onClick={() => setShowModal(true)}>
				Create an Event
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EventForm />
				</Modal>
			)}
		</>
	);
}

export default EventFormModal;
