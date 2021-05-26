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
						<h3>Whoops! Can't access the attendee or event. </h3>
						<p /> <h3>If you used a account with this event before, please log in using your original access link</h3>
						<p />
						<p /> <h3>It may have been deleted by the admin. </h3>
						<p />
						<h2>CLICK HERE to go home.</h2>
					</div>
				</a>
			</h1>
		</div>
	);
};

export default PageNotFound;
