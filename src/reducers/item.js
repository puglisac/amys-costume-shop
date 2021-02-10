import { GET_ITEMS, LOGOUT } from "../actions/actionTypes";

export default function items(state = {}, action) {
    switch (action.type) {
        case GET_ITEMS:
            const items = { ...state, items: action.payload };
            return items;
        case LOGOUT:
            return { ...state, items: null };
        default:
            return state;
    }
}