export const SET_ITEM = "mealplan/SET_MEALPLAN";
export const SET_LISTITEMS = "mealplan/SET_LISTMEALPLANS";
export const SET_ITEMSLOADEDFALSE = "mealplan/SET_MEALPLANSLOADEDFALSE";

// actions
const setItem = (mealplan) => ({
	type: SET_ITEM,
	payload: mealplan,
});

const setListItems = (mealplans) => ({
	type: SET_LISTITEMS,
	payload: mealplans,
});

const itemsUnloaded = () => ({
	type: SET_ITEMSLOADEDFALSE,
});

// thunk action creators
// create item
export const createItem = (attendeeAndItemData) => async (dispatch) => {
	const { attendeeURL, itemData } = attendeeAndItemData;
	const response = await fetch(`/api/item/${attendeeURL}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(itemData),
	});
	if (response.ok) {
		const item = await response.json();
		dispatch(itemsUnloaded());
		return item;
	} else return response.json();
};

// get all items in mealplan
export const getItems = (attendeeURL) => async (dispatch) => {
	const response = await fetch(`/api/item/${attendeeURL}`);
	if (response.ok) {
		const items = await response.json();
		dispatch(setListItems(items));
		return true;
	} else return response.json();
};

// delete item
export const deleteItem = (eventIdAndMealplanIdAndCurrentAttendeeURL) => async (dispatch) => {
	const { eventId } = eventIdAndMealplanIdAndCurrentAttendeeURL;
	const response = await fetch(`/api/mealplan/${eventId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventIdAndMealplanIdAndCurrentAttendeeURL),
	});
	if (response.ok) {
		const success = await response.json();
		dispatch(itemsUnloaded());
		return success;
	} else return response.json();
};

//reducer
const initialState = {
	listItems: null,
	loaded: false,
};

const itemReducer = (itemState = initialState, action) => {
	switch (action.type) {
		case SET_LISTITEMS:
			const { Items } = action.payload;
			return { ...itemState, listItems: Items, loaded: true };
		case SET_ITEMSLOADEDFALSE:
			return { ...itemState, loaded: false };
		default:
			return itemState;
	}
};

export default itemReducer;
