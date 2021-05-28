export const SET_ITEM = "mealplan/SET_ITEM";
export const SET_LISTITEMS = "mealplan/SET_LISTITEMS";
export const SET_ITEMSLOADEDFALSE = "mealplan/SET_ITEMSLOADEDFALSE";

// actions

export const setListItems = (mealplans) => ({
	type: SET_LISTITEMS,
	payload: mealplans,
});

export const itemsUnloaded = () => ({
	type: SET_ITEMSLOADEDFALSE,
});

// thunk action creators
// create item
export const createItem = (attendeeAndItemData) => async (dispatch) => {
	const { attendeeURL } = attendeeAndItemData;
	const response = await fetch(`/api/item/${attendeeURL}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(attendeeAndItemData),
	});
	if (response.ok) {
		const item = await response.json();
		dispatch(itemsUnloaded());
		return item;
	} else return response.json();
};

// get all items in mealplan
export const getItems = (attendeeURLandMealplanId) => async (dispatch) => {
	const { attendeeURL, mealplanId } = attendeeURLandMealplanId;
	const response = await fetch(`/api/item/${attendeeURL}/${mealplanId}`);
	if (response.ok) {
		const items = await response.json();
		dispatch(setListItems(items));
		return items;
	} else return response.json();
};

// edit item
export const editItem = (itemIdAndCurrentAttendeeURLandItemData) => async (dispatch) => {
	const { itemId } = itemIdAndCurrentAttendeeURLandItemData;
	const response = await fetch(`/api/item/${itemId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(itemIdAndCurrentAttendeeURLandItemData),
	});
	if (response.ok) {
		const item = await response.json();
		dispatch(itemsUnloaded());
		return item;
	} else return response.json();
};

// delete item
export const deleteItem = (itemIdAndCurrentAttendeeURL) => async (dispatch) => {
	const { itemId, attendeeURL } = itemIdAndCurrentAttendeeURL;
	console.log(itemId, "ITEM ID");
	const response = await fetch(`/api/item/${itemId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(attendeeURL),
	});
	if (response.ok) {
		const mealplanId = await response.json();
		return mealplanId.mealplanId;
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
			return { ...itemState, listItems: null, loaded: false };
		default:
			return itemState;
	}
};

export default itemReducer;
