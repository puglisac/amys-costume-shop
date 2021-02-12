import axios from "axios";
import { INVENTORY_URL, GET_CATEGORIES, ADD_CATEGORY } from "./actionTypes";

function getAllCategories(token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.get(`${INVENTORY_URL}categories/`, config);
            dispatch(gotCategories(data.categories));
        }
        catch (e) {
            throw e;
        }
    };
}

function addCategory(token, body) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.post(`${INVENTORY_URL}categories/`, body, config);
            dispatch(gotNewCategory(data.category));
        }
        catch (e) {
            throw new Error(e.response.data.msg);
        }
    };
}


function gotCategories(categories) {
    return { type: GET_CATEGORIES, payload: categories };
}

function gotNewCategory(category) {
    return { type: ADD_CATEGORY, payload: category };
}

export { getAllCategories, addCategory };