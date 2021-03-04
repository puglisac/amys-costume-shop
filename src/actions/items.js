import axios from "axios";
import { INVENTORY_URL, GET_ITEMS, ADD_ITEM, LOGOUT } from "./actionTypes";

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
            if (e.response.status == 404) {
                throw ("No such item");
            } else if (e.response.status == 401) {
                if (e.response.data.msg && e.response.data.msg == "Token has expired") {
                    alert("Please log back in");
                    dispatch({ type: LOGOUT });
                }
                else throw (e.response.data.message);
            } else {
                throw (e);
            }
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
            if (e.response.status == 404) {
                throw ("No such item");
            } else if (e.response.status == 401) {
                if (e.response.data.msg && e.response.data.msg == "Token has expired") {
                    alert("Please log back in");
                    dispatch({ type: LOGOUT });
                }
                else throw (e.response.data.message);
            } else {
                throw (e);
            }
        }

    };
}

function addItem(token, body) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.post(`${INVENTORY_URL}items/`, body, config);
            dispatch(gotNewItem(data.item));
        } catch (e) {
            if (e.response.status == 401) {
            } else {
                throw (e);
            }
        }
    };
}

function editItem(token, body, itemId) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.patch(`${INVENTORY_URL}items/${itemId}`, body, config);
            dispatch(gotItems(data.item));
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such item");
            } else if (e.response.status == 401) {
                throw (e.response.data.message);
            } else {
                throw (e);
            }
        }
    };
}

function removeItem(token, itemId) {
    return async function () {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.delete(`${INVENTORY_URL}items/${itemId}`, config);
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such item");
            } else if (e.response.status == 401) {
                throw (e.response.data.message);
            } else {
                throw (e);
            }
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