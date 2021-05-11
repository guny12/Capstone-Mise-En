// const SET_ALLEVENTS = "events/SET_ALLEVENTS";
const SET_CurrentEvent = "events/SET_CurrentEvent";
export const SET_EVENTLOADEDFALSE = "events/SET_EVENTLOADEDFALSE";
// const SET_EventDataOk = "events/SET_EventDataOk";

// action creators

const setCurrentEvent = (event) => ({
	type: SET_CurrentEvent,
	payload: event,
});

const eventsUnloaded = () => ({
	type: SET_EVENTLOADEDFALSE,
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
		dispatch(setCurrentEvent(data));
		return data;
	} else return response.json();
};

// get event to put in store
export const getEvent = (eventId) => async (dispatch) => {
	const response = await fetch(`/api/event/${eventId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(setCurrentEvent(data));
		return data;
	} else return response.json();
};

export const checkEventData = (eventData) => async (dispatch) => {
	const response = await fetch("/api/event/check", {
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
	loaded: false,
};

const eventReducer = (eventState = initialState, action) => {
	switch (action.type) {
		case SET_CurrentEvent:
			let { CurrentEvent } = action.payload;
			return { ...eventState, currentEvent: CurrentEvent, loaded: true };
		case SET_EVENTLOADEDFALSE:
			return { ...eventState, loaded: false };
		default:
			return eventState;
	}
};

export default eventReducer;
