import React from "react";
import { Button, Popover } from "react-bootstrap";

const PopOver = ({ attendee }) => (
	<Popover id="popover-basic">
		<Popover.Title as="h3">{attendee.name}</Popover.Title>
		<Popover.Content>
			<Button variant="primary">Remove Attendee </Button>
		</Popover.Content>
	</Popover>
);

export default PopOver;
