import axios from "axios";
import { GET_TOKEN, LOGOUT, INVENTORY_URL, GET_CURR_USER, GET_USERS, ADD_USER, REMOVE_USER } from "./actionTypes";

function loginUser(email, password) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${INVENTORY_URL}users/login`, { email, password });
            dispatch(gotToken(data.access_token));
            dispatch(getCurrUser(email, data.access_token));
        } catch (e) {
            if (e.response) {
                throw (e.response.data.message);
            } else {
                throw (e);
            }
        }
    };
}

function getCurrUser(email, token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get(`${INVENTORY_URL}users/${email}`, config);
        dispatch(gotCurrUser(data.user));
    };
}

function getUser(email, token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get(`${INVENTORY_URL}users/${email}`, config);
        dispatch(gotUser(data.user));
    };
}


function getAllUsers(token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.get(`${INVENTORY_URL}users/`, config);
        dispatch(gotUser(data.users));
    };
}

function addItemToPullList(token, email, item_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.patch(`${INVENTORY_URL}users/${email}/add_item`, { item_id }, config);
        dispatch(gotUser(data.user));
    };
}

function removeItemFromPullList(token, email, item_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.patch(`${INVENTORY_URL}users/${email}/remove_item`, { item_id }, config);
        dispatch(gotUser(data.user));
    };
}

function editUser(token, body, email) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.patch(`${INVENTORY_URL}users/${email}`, body, config);
        dispatch(gotUser(data.user));
    };
}

function addUser(token, body) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.post(`${INVENTORY_URL}users/signup`, body, config);
        dispatch(gotNewUser(data.user));
    };
}

function removeUser(token, email) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        await axios.delete(`${INVENTORY_URL}users/${email}`, config);
        dispatch(removedUser(email));
    };
}

function gotToken(token) {
    return { type: GET_TOKEN, payload: token };
}

function gotCurrUser(user) {
    return { type: GET_CURR_USER, payload: user };
}

function gotNewUser(user) {
    return { type: ADD_USER, payload: user };
}

function gotUser(user) {
    return { type: GET_USERS, payload: user };
}

function removedUser(email) {
    return { type: REMOVE_USER, payload: email };
}

function logout() {
    return { type: LOGOUT };
}

export { loginUser, gotToken, logout, addItemToPullList, getCurrUser, removeItemFromPullList, getUser, editUser, addUser, getAllUsers, removeUser };