// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { LogoModalWrapper } from "../../context/Modal";
import Logo from "./Logo";
import { Button } from "react-bootstrap";

function LogoModal(props) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="LogoButton" variant="dark" hidden onClick={() => setShowModal(true)}></Button>
			{showModal && (
				<LogoModalWrapper onClose={() => setShowModal(false)}>
					<Logo />
				</LogoModalWrapper>
			)}
		</>
	);
}

export default LogoModal;
