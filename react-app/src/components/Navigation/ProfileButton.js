import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Button } from "react-bootstrap";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => {
			setShowMenu(false);
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = async (e) => {
		e.preventDefault();
		await dispatch(sessionActions.logout());
		history.go(0);
	};

	return (
		<>
			<Button className="btn btn-dark" onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</Button>
			{showMenu && (
				<ul className="profile-dropdown">
					<li>{user.username}</li>
					<li>
						<button onClick={logout}>Log Out</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
