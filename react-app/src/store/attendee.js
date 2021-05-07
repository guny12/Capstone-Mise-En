export const SET_ATTENDEE = "session/SET_ATTENDEE";
const SET_AttendeeDataOk = "events/SET_AttendeeDataOk";

const setAttendee = (attendee) => ({
	type: SET_ATTENDEE,
	payload: attendee,
});

// thunk action creators
// create attendee
export const createAttendee = (attendeeAndCurrentEvent) => async (dispatch) => {
	const eventId = attendeeAndCurrentEvent.currentEvent.id;
	const response = await fetch(`/api/event/${eventId}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(attendeeAndCurrentEvent),
	});
	if (response.ok) {
		const attendee = await response.json();
		return attendee;
	} else return response.json();
};

// get attendee to put in store
export const getAttendee = (attendeeURL) => async (dispatch) => {
	const response = await fetch(`/api/attendee/${attendeeURL}`);
	if (response.ok) {
		const attendee = await response.json();
		dispatch(setAttendee(attendee));
		return attendee;
	} else return response.json();
};

export const checkAttendeeData = (attendeeData) => async (dispatch) => {
	const response = await fetch(`/api/attendee/check`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(attendeeData),
	});
	if (response.ok) {
		const attendeeDataOk = await response.json();
		return attendeeDataOk;
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
