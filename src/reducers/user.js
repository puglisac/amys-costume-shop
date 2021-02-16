import { GET_USERS, LOGOUT, ADD_USER, REMOVE_USER } from "../actions/actionTypes";

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            const users = { ...state, users: action.payload };
            return users;
        case ADD_USER:
            const newUser = { ...state, users: [...state.users, action.payload] };
            return newUser;
        case REMOVE_USER:
            const updatedUsers = { ...state, users: [state.users.filter(u => u.email != action.payload)] };
            return updatedUsers;
        case LOGOUT:
            return { ...state, users: null };
        default:
            return state;
    }
}