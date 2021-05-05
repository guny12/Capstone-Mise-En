import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./Landing.css";
import { Button, Form } from "react-bootstrap";

const Landing = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userName = useSelector((state) => state.session.user?.username);
	const userId = useSelector((state) => state.session.user?.id);

	const [name, setName] = useState("");
	const [locationName, setLocationName] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState();
	const [startTime, setStartTime] = useState();
	const [type, setType] = useState("");
	const [totalCost, setTotalCost] = useState();
	const [availableSpots, setAvailableSpots] = useState();
	const [hostId, setHostId] = useState(userId);

	const close = document.querySelector("#modal-background");

	return (
		<div>
			{userName && (
				<>
					<h2>{` Welcome ${userName}!`}</h2>
				</>
			)}
			<h1>Create your Event and start inviting people</h1>
			<Form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email </Form.Label>
					<Form.Control
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Enter Email"
					/>
				</Form.Group>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username </Form.Label>
					<Form.Control
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Enter Username"
					/>
				</Form.Group>
				<Form.Group controlId="formBasicFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						placeholder="Enter First Name"
					/>
				</Form.Group>
				<Form.Group controlId="formBasicLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						placeholder="Enter Last Name"
					/>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Enter your password"
					/>
					<Form.Label>Confirm Password </Form.Label>
					<Form.Control
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Your Password"
						required
					/>
				</Form.Group>
				<Button type="submit">Sign Up</Button>
			</Form>
		</div>
	);
};

export default Landing;
