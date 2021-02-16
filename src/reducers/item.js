import { ADD_ITEM, GET_ITEMS, LOGOUT, REMOVE_ITEM } from "../actions/actionTypes";

export default function items(state = {}, action) {
    switch (action.type) {
        case GET_ITEMS:
            const items = { ...state, items: action.payload };
            return items;
        case ADD_ITEM:
            const newItems = { ...state, items: [...state.items, action.payload] };
            return newItems;
        case REMOVE_ITEM:
            const updatedItems = { ...state, items: [state.items.filter(i => i.id != action.payload)] };
            return updatedItems;
        case LOGOUT:
            return { ...state, items: null };
        default:
            return state;
    }
}