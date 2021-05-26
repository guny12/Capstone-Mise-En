const SET_USEREVENTS = "events/SET_USEREVENTS";
const SET_CURRENTEVENT = "events/SET_CurrentEvent";
export const SET_EVENTLOADEDFALSE = "events/SET_EVENTLOADEDFALSE";
// const SET_EventDataOk = "events/SET_EventDataOk";

// action creators

const setCurrentEvent = (event) => ({
	type: SET_CURRENTEVENT,
	payload: event,
});

const eventsUnloaded = () => ({
	type: SET_EVENTLOADEDFALSE,
});

const setUserEvents = (events) => ({
	type: SET_USEREVENTS,
	payload: events,
});

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

//  updates an event and then sets eventsUnloaded to trigger useEffect
export const updateEvent = (eventData) => async (dispatch) => {
	const { eventId } = eventData;
	const response = await fetch(`/api/event/${eventId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(eventsUnloaded());
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

// get logged in user's events to put in store
export const getEvents = () => async (dispatch) => {
	const response = await fetch(`/api/event/`);
	if (response.ok) {
		const events = await response.json();
		dispatch(setUserEvents(events));
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
	upcomingEvents: {},
	previousEvents: {},
};

const eventReducer = (eventState = initialState, action) => {
	switch (action.type) {
		case SET_CURRENTEVENT:
			let { CurrentEvent } = action.payload;
			return { ...eventState, currentEvent: CurrentEvent, loaded: true };
		case SET_USEREVENTS:
			let { upcomingEvents, previousEvents } = action.payload;
			return { ...eventState, upcomingEvents, previousEvents };
		case SET_EVENTLOADEDFALSE:
			return { ...eventState, loaded: false };
		default:
			return eventState;
	}
};

export default eventReducer;
