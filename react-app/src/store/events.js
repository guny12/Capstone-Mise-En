import { createAttendee } from "./attendee";

// const SET_ALLEVENTS = "events/SET_ALLEVENTS";
const SET_SINGLEEVENT = "events/SET_SINGLEEVENT";

// action creators

const setSingleEvent = (event) => ({
	type: SET_SINGLEEVENT,
	payload: event,
});

// const setAllEvents = (events) => ({
// 	type: SET_ALLEVENTS,
// 	payload: events,
// });

// thunk action creators
export const createEvent = (eventData) => async (dispatch) => {
	const response = await fetch("/api/event/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setSingleEvent(data));
		// activate this path when you start setting up logged in user interaction
		// if (data.CurrentEvent?.creatorUserId !== null) dispatch(getJoinedEvents(data.CurrentEvent.creatorUserId));
		return data;
	} else return response.json();
};

//reducer
const initialState = {
	currentEvent: {},
	joinedEvents: [],
};

const eventReducer = (eventState = initialState, action) => {
	switch (action.type) {
		case SET_SINGLEEVENT:
			let { CurrentEvent } = action.payload;
			return { ...eventState, currentEvent: CurrentEvent };
		default:
			return eventState;
	}
};

export default eventReducer;
