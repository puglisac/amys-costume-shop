import axios from "axios";
import { INVENTORY_URL, GET_ITEMS, ADD_ITEM } from "./actionTypes";

function getAllItems(token, category_id = null) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        if (category_id) {
            const { data } = await axios.get(`${INVENTORY_URL}items/?category_id=${category_id}`, config);
            dispatch(gotItems(data.items));
        } else {
            const { data } = await axios.get(`${INVENTORY_URL}items/`, config);
            dispatch(gotItems(data.items));
        }
    };
}


function getOneItem(token, itemId) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get(`${INVENTORY_URL}items/${itemId}`, config);
        dispatch(gotItems(data.item));
    };
}

function addItem(token, body) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.post(`${INVENTORY_URL}items/`, body, config);
        dispatch(gotNewItem(data.item));
    };
}

function editItem(token, body, itemId) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.patch(`${INVENTORY_URL}items/${itemId}`, body, config);
        dispatch(gotItems(data.item));
    };
}


function gotItems(items) {
    return { type: GET_ITEMS, payload: items };
}

function gotNewItem(item) {
    return { type: ADD_ITEM, payload: item };
}

export { getAllItems, addItem, getOneItem, editItem };