import { createAttendee } from "./attendee";

// const SET_ALLEVENTS = "events/SET_ALLEVENTS";
const SET_SingleEvent = "events/SET_SingleEvent";
const SET_EventDataOk = "events/SET_EventDataOk";

// action creators

const setSingleEvent = (event) => ({
	type: SET_SingleEvent,
	payload: event,
});

const setEventDataOk = (eventDataOk) => ({
	type: SET_EventDataOk,
	payload: eventDataOk,
});
// const setAllEvents = (events) => ({
// 	type: SET_ALLEVENTS,
// 	payload: events,
// });

// thunk action creators
// create event
export const createEvent = (eventData) => async (dispatch) => {
	const response = await fetch("/api/event/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else return response.json();
};

// get event to put in store
export const getEvent = (attendeeURL) => async (dispatch) => {
	const response = await fetch("/api/event/");
	if (response.ok) {
		const data = await response.json();
		dispatch(setSingleEvent(data));
		// activate this path when you start setting up logged in user interaction
		// if (data.CurrentEvent?.creatorUserId !== null) dispatch(getJoinedEvents(data.CurrentEvent.creatorUserId));
		return data;
	} else return response.json();
};

export const checkEventData = (eventData) => async (dispatch) => {
	const response = await fetch("/api/event/check/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const eventDataOk = await response.json();
		return eventDataOk;
	} else return response.json();
};

//reducer
const initialState = {
	currentEvent: {},
	joinedEvents: [],
	isEventDataOk: false,
};

const eventReducer = (eventState = initialState, action) => {
	switch (action.type) {
		case SET_SingleEvent:
			let { CurrentEvent } = action.payload;
			return { ...eventState, currentEvent: CurrentEvent };
		case SET_EventDataOk:
			let { eventDataOK } = action.payload;
			return { ...eventState, isEventDataOK: eventDataOK };
		default:
			return eventState;
	}
};

export default eventReducer;
