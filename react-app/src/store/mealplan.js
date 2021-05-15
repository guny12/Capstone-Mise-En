import { SET_EVENTLOADEDFALSE } from "./event";
export const SET_MEALPLAN = "mealplan/SET_MEALPLAN";
export const SET_LISTMEALPLANS = "mealplan/SET_LISTMEALPLANS";
export const SET_MEALPLANSLOADEDFALSE = "mealplan/SET_MEALPLANSLOADEDFALSE";

// actions
const setMealplan = (mealplan) => ({
	type: SET_MEALPLAN,
	payload: mealplan,
});

const setListMealplans = (mealplans) => ({
	type: SET_LISTMEALPLANS,
	payload: mealplans,
});

const mealplansUnloaded = () => ({
	type: SET_MEALPLANSLOADEDFALSE,
});

// thunk action creators
// create mealplan
export const createMealplan = (attendeeAndMealplanData) => async (dispatch) => {
	const eventId = attendeeAndMealplanData.attendee.eventId;
	const response = await fetch(`/api/mealplan/${eventId}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(attendeeAndMealplanData),
	});
	if (response.ok) {
		const mealplan = await response.json();
		dispatch(mealplansUnloaded());
		return mealplan;
	} else return response.json();
};

// get all mealplans in event
// call this after you modify a single event as well, just because someone else may have modified
// the mealplans elsewhere. If you just grab the one you just modified, can be inconsistent.
// this may run into scaling issues later. But go with this for now.
export const getMealplans = (eventId) => async (dispatch) => {
	const response = await fetch(`/api/mealplan/${eventId}`);
	if (response.ok) {
		const mealplans = await response.json();
		dispatch(setListMealplans(mealplans));
		return true;
	} else return response.json();
};

// delete mealplan
export const deleteMealplan = (eventIdAndMealplanIdAndCurrentAttendeeURL) => async (dispatch) => {
	const { eventId } = eventIdAndMealplanIdAndCurrentAttendeeURL;
	const response = await fetch(`/api/mealplan/${eventId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventIdAndMealplanIdAndCurrentAttendeeURL),
	});
	if (response.ok) {
		const success = await response.json();
		dispatch(mealplansUnloaded());
		// dispatch({ type: SET_EVENTLOADEDFALSE });
		return success;
	} else return response.json();
};

//reducer
const initialState = {
	currentMealplan: null,
	listMealplans: null,
	loaded: false,
};

const mealplanReducer = (mealplanState = initialState, action) => {
	switch (action.type) {
		case SET_MEALPLAN:
			const { CurrentMealplan } = action.payload;
			return { ...mealplanState, currentMealplan: CurrentMealplan };
		case SET_LISTMEALPLANS:
			return mealplanState;
		case SET_MEALPLANSLOADEDFALSE:
			return { ...mealplanState, loaded: false };
		default:
			return mealplanState;
	}
};

export default mealplanReducer;
