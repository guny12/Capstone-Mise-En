import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ props }) => {
	const [show, setShow] = useState(true);

	if (show) {
		return (
			<Alert variant="danger" onClose={() => setShow(false)} dismissible>
				<Alert.Heading>Delete {props.name}</Alert.Heading>
				<p>Are you sure you want to delete {props.name}?</p>
				<Button> Delete</Button>
			</Alert>
		);
	}
};

export default AlertMessage;
