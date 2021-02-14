import axios from "axios";
import { INVENTORY_URL, GET_CATEGORIES, ADD_CATEGORY } from "./actionTypes";

function getAllCategories(token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get(`${INVENTORY_URL}categories/`, config);
        dispatch(gotCategories(data.categories));

    };
}

function getOneCategory(token, category_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get(`${INVENTORY_URL}categories/${category_id}`, config);
        dispatch(gotCategories(data.category));

    };
}

function addCategory(token, body) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.post(`${INVENTORY_URL}categories/`, body, config);
        dispatch(gotNewCategory(data.category));

    };
}

function editCategory(token, body, categoryId) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.patch(`${INVENTORY_URL}categories/${categoryId}`, body, config);
        dispatch(gotCategories(data.category));
    };
}


function gotCategories(categories) {
    return { type: GET_CATEGORIES, payload: categories };
}

function gotNewCategory(category) {
    return { type: ADD_CATEGORY, payload: category };
}

export { getAllCategories, addCategory, getOneCategory, editCategory };