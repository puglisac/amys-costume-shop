import { GET_USERS, LOGOUT } from "../actions/actionTypes";

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            const users = { ...state, users: action.payload };
            return users;
        case LOGOUT:
            return { ...state, users: null };
        default:
            return state;
    }
}