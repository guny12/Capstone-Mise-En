import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
	const modalRef = useRef();
	const [value, setValue] = useState();

	useEffect(() => setValue(modalRef.current), []);

	return (
		<>
			<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
}

export function Modal({ onClose, children }) {
	const modalNode = useContext(ModalContext);
	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div id="modal">
			<div id="modal-background" onClick={onClose} />
			<div id="modal-content">{children}</div>
		</div>,
		modalNode
	);
}

export function LogoModalWrapper({ onClose, children }) {
	const modalNode = useContext(ModalContext);
	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div id="Logo-modal">
			<div id="Logo-modal-background" onClick={onClose} />
			<div id="Logo-modal-content">{children}</div>
		</div>,
		modalNode
	);
}

export function CreateAttendeeModalWrapper({ onClose, children }) {
	const modalNode = useContext(ModalContext);
	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div id="modal">
			<div id="modal-background" onClick={onClose} />
			<div id="Attendee-modal-content">{children}</div>
		</div>,
		modalNode
	);
}
