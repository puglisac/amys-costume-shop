import { ADD_CATEGORY, GET_CATEGORIES, LOGOUT, REMOVE_CATEGORY } from "../actions/actionTypes";

export default function categories(state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            const items = { ...state, categories: action.payload };
            return items;
        case ADD_CATEGORY:
            const newCategory = { ...state, categories: [...state.categories, action.payload] };
            return newCategory;
        case REMOVE_CATEGORY:
            const updatedCategories = { ...state, categories: [state.categories.filter(c => c.id != action.payload)] };
            return updatedUsers;
        case LOGOUT:
            return { ...state, categories: null };
        default:
            return state;
    }
}