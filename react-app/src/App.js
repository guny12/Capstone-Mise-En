import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./components/Home";
import Landing from "./components/Landing";
import EventPage from "./components/EventPage";
import LogoModal from "./components/LogoModal";

import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	const loggedIn = useSelector((state) => state?.session?.user);

	useEffect(() => {
		(async () => {
			if (!loggedIn) {
				await dispatch(sessionActions.restoreUser());
				setLoaded(true);
			}
		})();
	}, [dispatch, loggedIn]);

	if (!loaded) return null;

	return (
		<>
			<LogoModal />
			<Navigation />
			<Switch>
				<ProtectedRoute path="/home" exact={true}>
					<Home />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					{/* <LogoModal /> */}
					<Landing />
				</Route>
				<Route path="/event/">
					<EventPage />
				</Route>
				<Route path="/">
					<Redirect to="/" />
				</Route>
			</Switch>
		</>
	);
}

export default App;
