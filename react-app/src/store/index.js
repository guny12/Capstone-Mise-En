import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import eventReducer from "./event";
import attendeeReducer from "./attendee";
import mealplanReducer from "./mealplan";
import itemReducer from "./item";

const rootReducer = combineReducers({
	session: sessionReducer,
	event: eventReducer,
	attendee: attendeeReducer,
	mealplan: mealplanReducer,
	item: itemReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
