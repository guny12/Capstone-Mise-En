import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import Home from "./components/Home";

import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			await dispatch(sessionActions.restoreUser());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) return null;

	return (
		<>
			<Navigation />
			<Switch>
				{/* <ProtectedRoute path="/home" exact={true}>
					<Home />
				</ProtectedRoute> */}
				{/* <Route path="/">
					<Redirect to="/home" />
				</Route> */}
			</Switch>
		</>
	);
}

export default App;
