export const SET_ATTENDEE = "attendee/SET_ATTENDEE";
export const SET_LISTATTENDEES = "attendee/SET_LISTATTENDEES";
export const SET_ATTENDEESLOADEDFALSE = "attendee/SET_ATTENDEESLOADEDFALSE";
// const SET_AttendeeDataOk = "events/SET_AttendeeDataOk";

const setAttendee = (attendee) => ({
	type: SET_ATTENDEE,
	payload: attendee,
});

const setListAttendees = (attendees) => ({
	type: SET_LISTATTENDEES,
	payload: attendees,
});

const attendeesUnloaded = () => ({
	type: SET_ATTENDEESLOADEDFALSE,
});
// thunk action creators
// create attendee
export const createAttendee = (attendeeAndCurrentEvent) => async (dispatch) => {
	const eventId = attendeeAndCurrentEvent.currentEvent.id;
	const response = await fetch(`/api/attendee/${eventId}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(attendeeAndCurrentEvent),
	});
	if (response.ok) {
		const attendee = await response.json();
		dispatch(attendeesUnloaded());
		return attendee;
	} else return response.json();
};

// get attendee to put in store
export const getAttendee = (attendeeURL) => async (dispatch) => {
	const response = await fetch(`/api/attendee/current/${attendeeURL}`);
	if (response.ok) {
		const attendee = await response.json();
		dispatch(setAttendee(attendee));
		if (attendee.eventId) return attendee.eventId;
		return attendee.CurrentAttendee.eventId;
	} else return response.json();
};

export const getAttendees = (attendeeURL) => async (dispatch) => {
	const response = await fetch(`/api/attendee/list/${attendeeURL}`);
	if (response.ok) {
		const attendees = await response.json();
		dispatch(setListAttendees(attendees));
		return true;
	} else return response.json();
};

export const deleteTargetAttendee = (targetIdAndCurrentAttendeeURL) => async (dispatch) => {
	const { targetAttendeeId, currentAttendeeURL } = targetIdAndCurrentAttendeeURL;
	const response = await fetch(`/api/attendee/${targetAttendeeId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(currentAttendeeURL),
	});
	if (response.ok) {
		const success = await response.json();
		dispatch(attendeesUnloaded());
		return success;
	} else return response.json();
};

export const setAttendeeHost = (targetIdAndCurrentAttendeeURL) => async (dispatch) => {
	const { targetAttendeeId, currentAttendeeURL } = targetIdAndCurrentAttendeeURL;
	const response = await fetch(`/api/attendee/${targetAttendeeId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(currentAttendeeURL),
	});
	if (response.ok) {
		const success = await response.json();
		dispatch(attendeesUnloaded());
		return success;
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
	listAttendees: null,
	loaded: false,
};

const attendeeReducer = (attendeeState = initialState, action) => {
	switch (action.type) {
		case SET_ATTENDEE:
			const { CurrentAttendee } = action.payload;
			return { ...attendeeState, currentAttendee: CurrentAttendee };
		case SET_LISTATTENDEES:
			const { listAttendees, totalAttendees, numGoing } = action.payload;
			return { ...attendeeState, listAttendees, totalAttendees, numGoing, loaded: true };
		case SET_ATTENDEESLOADEDFALSE:
			return { ...attendeeState, loaded: false };
		default:
			return attendeeState;
	}
};

export default attendeeReducer;
