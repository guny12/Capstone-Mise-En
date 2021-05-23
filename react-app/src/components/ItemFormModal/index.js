import React, { useState } from "react";
import { CreateAttendeeModalWrapper } from "../../context/Modal";
import ItemForm from "./ItemForm";
import { Button } from "react-bootstrap";

function ItemFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="ItemButton" variant="dark" style={{ width: "300px" }} onClick={() => setShowModal(true)}>
				Create Item
			</Button>
			{showModal && (
				<CreateAttendeeModalWrapper onClose={() => setShowModal(false)}>
					<ItemForm />
				</CreateAttendeeModalWrapper>
			)}
		</>
	);
}

export default ItemFormModal;
