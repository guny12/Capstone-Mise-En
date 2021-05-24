import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditItemForm from "./ItemForm";
import { Button } from "react-bootstrap";

function EditItemFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="EditItemButton" variant="secondary" onClick={() => setShowModal(true)}>
				Edit Item
			</Button>
			{showModal && (
				<CreateAttendeeModalWrapper onClose={() => setShowModal(false)}>
					<ItemForm />
				</CreateAttendeeModalWrapper>
			)}
		</>
	);
}

export default EditItemFormModal;
