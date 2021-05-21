import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import MealplanForm from "./MealplanForm";
import { Button } from "react-bootstrap";

function MealplanFormModal({ eventData }) {
	const [showModal, setShowModal] = useState(false);

	// const eventDataOk = document.querySelector("#LandingCreateEventButton");
	// if (eventDataOk) eventDataOk.click();

	return (
		<>
			<Button id="CreateMealplanButton" variant="dark" style={{ width: "300px" }} onClick={() => setShowModal(true)}>
				Create Mealplan
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<MealplanForm />
				</Modal>
			)}
		</>
	);
}

export default MealplanFormModal;
