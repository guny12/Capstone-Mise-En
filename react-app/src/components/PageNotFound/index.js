import React from "react";
import { Image } from "react-bootstrap";
import "./PageNotFound.css";

const PageNotFound = () => {
	return (
		<div className="page-not-found__container">
			<Image fluid src={"https://cdn.pixabay.com/photo/2014/04/02/16/29/scream-307414__340.png"}></Image>
			<h1>
				<a href="/" style={{ color: "darkblue" }}>
					<div>
						Whoops! Can't find the attendee or event.
						<p /> If you used a account with this event before, please log in.
						<p />
						<p /> It may have been deleted by the admin. <p />
						CLICK HERE to go home.
					</div>
				</a>
			</h1>
		</div>
	);
};

export default PageNotFound;
