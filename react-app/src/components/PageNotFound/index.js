import React from "react";
import { Image } from "react-bootstrap";

const PageNotFound = () => {
	return (
		<>
			<Image fluid src={"https://cdn.pixabay.com/photo/2014/04/02/16/29/scream-307414__340.png"}></Image>
			<h1>
				<a href="/" style={{ color: "darkblue" }}>
					<div>
						Whoops! Can't find the attendee or event.
						<p /> It may have been deleted by the admin. <p />
						CLICK HERE to go home.
					</div>
				</a>
			</h1>
		</>
	);
};

export default PageNotFound;
