const SET_ALLEVENTS = "events/SET_ALLEVENTS";
const SET_SINGLEEVENT = "events/SET_SINGLEEVENT";

// action creators
const setAllEvents = (events) => ({
	type: SET_ALLEVENTS,
	payload: events,
});

const setSingleEvent = (event) => ({
	type: SET_SINGLEEVENT,
	payload: event,
});

// thunk action creators
export const createEvent = (eventData) => async (dispatch) => {
	const response = await csrfFetch("/api/createEvent", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getEvents());
		return data;
	}
};

//reducer
const initialState = {
	currentEvent: {},
	joinedEvents: [],
};

const eventReducer = (eventState = initialState, action) => {
	switch (action.type) {
		case SET_SINGLEEVENT:
			let { JoinedEvents, CurrentEvent } = action.payload;
			return {
				...eventState,
				currentEvent: CurrentEvent,
				joinedEvents: JoinedEvents,
			};
		default:
			return eventState;
	}
};

export default eventReducer;
