import axios from "axios";
import { GET_TOKEN, LOGOUT, INVENTORY_URL, GET_CURR_USER, GET_USERS } from "./actionTypes";

function loginUser(email, password) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${INVENTORY_URL}users/login`, { email, password });
            dispatch(gotToken(data.access_token));
            dispatch(getCurrUser(email, data.access_token));
        }
        catch (e) {
            throw new Error(e.response.data.msg);
        }
    };
}

function getCurrUser(email, token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.get(`${INVENTORY_URL}users/${email}`, config);
            dispatch(gotCurrUser(data.user));
        }
        catch (e) {
            throw new Error(e.response.data.msg);
        }
    };
}

function getUser(email, token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.get(`${INVENTORY_URL}users/${email}`, config);
            dispatch(gotUser(data.user));
        }
        catch (e) {
            throw e;
        }
    };
}

function addItemToPullList(token, email, item_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.patch(`${INVENTORY_URL}users/${email}/add_item`, { item_id }, config);
            dispatch(gotUser(data.user));
        }
        catch (e) {
            alert(e);
        }
    };
}

function removeItemFromPullList(token, email, item_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.patch(`${INVENTORY_URL}users/${email}/remove_item`, { item_id }, config);
            dispatch(gotUser(data.user));
        }
        catch (e) {
            throw e;
        }
    };
}

function gotToken(token) {
    return { type: GET_TOKEN, payload: token };
}

function gotCurrUser(user) {
    return { type: GET_CURR_USER, payload: user };
}


function gotUser(user) {
    return { type: GET_USERS, payload: user };
}

function logout() {
    return { type: LOGOUT };
}

export { loginUser, gotToken, logout, addItemToPullList, getCurrUser, removeItemFromPullList, getUser };