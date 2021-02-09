import { GET_CURR_USER, LOGOUT } from "../actions/actionTypes";

export default function currUser(state = {}, action) {
    switch (action.type) {
        case GET_CURR_USER:
            const currUser = { ...state, currUser: action.payload };
            return currUser;
        case LOGOUT:
            return { ...state, currUser: null };
        default:
            return state;
    }
}