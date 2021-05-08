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
			<Switch>
				<ProtectedRoute path="/home" exact={true}>
					<Navigation />
					<Home />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					{loggedIn && <Navigation />}
					<Landing />
				</Route>
				<Route path="/event/">
					<Navigation />
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
