import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditItemForm from "./EditItemForm";
import { Button } from "react-bootstrap";

function EditItemFormModal({ itemId }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="EditItemButton" variant="secondary" onClick={() => setShowModal(true)}>
				Edit Item
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditItemForm itemId={itemId} />
				</Modal>
			)}
		</>
	);
}

export default EditItemFormModal;
