import axios from "axios";
import { INVENTORY_URL, GET_ITEMS, ADD_ITEM } from "./actionTypes";
import { errorHandler } from "./errorHandler";

function getAllItems(token, category_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            if (category_id) {
                const { data } = await axios.get(`${INVENTORY_URL}items/?category_id=${category_id}`, config);
                dispatch(gotItems(data.items));
            } else {
                const { data } = await axios.get(`${INVENTORY_URL}items/`, config);
                dispatch(gotItems(data.items));
            }
        } catch (e) {
            errorHandler(e, dispatch, "item");
        }
    };
}

function getOneItem(token, itemId) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.get(`${INVENTORY_URL}items/${itemId}`, config);
            dispatch(gotItems(data.item));
        } catch (e) {
            errorHandler(e, dispatch, "item");
        }
    };
}

function addItem(token, body, file) {
    return async function (dispatch) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const { data } = await axios.post(`${INVENTORY_URL}items/`, body, config);
            const addedItem = data.item;
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                const { data } = await axios.post(`${INVENTORY_URL}items/${addedItem.id}add_image`, formData, config);
                dispatch(gotNewItem(data.item));
            } else {
                dispatch(gotNewItem(addedItem));
            }
        } catch (e) {
            errorHandler(e, dispatch, "item");
        }
    };
}

function editItem(token, body, file, itemId) {
    return async function (dispatch) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const { data } = await axios.patch(`${INVENTORY_URL}items/${itemId}`, body, config);
            const editedItem = data.item;
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                const { data } = await axios.post(`${INVENTORY_URL}items/${editedItem.id}add_image`, formData, config);
                dispatch(gotNewItem(data.item));
            } else {
                dispatch(gotNewItem(editedItem));
            }
        } catch (e) {
            errorHandler(e, dispatch, "item");
        }
    };
}

function removeItem(token, itemId) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.delete(`${INVENTORY_URL}items/${itemId}`, config);
        } catch (e) {
            errorHandler(e, dispatch, "item");
        }
    };
}

function gotItems(items) {
    return { type: GET_ITEMS, payload: items };
}

function gotNewItem(item) {
    return { type: ADD_ITEM, payload: item };
}

export { getAllItems, addItem, getOneItem, editItem, removeItem };