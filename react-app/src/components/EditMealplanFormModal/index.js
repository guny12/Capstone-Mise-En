import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditMealplanForm from "./EditMealplanForm";
import { Button } from "react-bootstrap";

function EditMealplanFormModal({ eventData }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="EditMealplanButton" variant="secondary" onClick={() => setShowModal(true)}>
				Edit Name
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditMealplanForm />
				</Modal>
			)}
		</>
	);
}

export default EditMealplanFormModal;
