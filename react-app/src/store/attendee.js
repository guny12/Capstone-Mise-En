export const SET_ATTENDEE = "session/SET_ATTENDEE";

const setAttendee = (attendee) => ({
	type: SET_ATTENDEE,
	payload: attendee,
});

// thunk action creators
export const createAttendee = (CurrentEvent) => async (dispatch) => {
	const eventId = CurrentEvent.id;
	const response = await fetch(`/api/event/${eventId}/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(CurrentEvent),
	});
	if (response.ok) {
		const attendee = await response.json();
		dispatch(setAttendee(attendee));
		return attendee;
	} else return response.json();
};

//reducer
const initialState = {
	currentAttendee: null,
};

const attendeeReducer = (attendeeState = initialState, action) => {
	switch (action.type) {
		case SET_ATTENDEE:
			let { CurrentAttendee } = action.payload;
			return { ...attendeeState, currentAttendee: CurrentAttendee };
		default:
			return attendeeState;
	}
};

export default attendeeReducer;
