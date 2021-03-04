import axios from "axios";
import { GET_TOKEN, LOGOUT, INVENTORY_URL, GET_CURR_USER, GET_USERS, ADD_USER } from "./actionTypes";

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

        try {
            const { data } = await axios.get(`${INVENTORY_URL}users/${email}`, config);
            dispatch(gotCurrUser(data.user));
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such user");
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

function getUser(email, token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.get(`${INVENTORY_URL}users/${email}`, config);
            dispatch(gotUser(data.user));
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such user");
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


function getAllUsers(token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.get(`${INVENTORY_URL}users/`, config);
            dispatch(gotUser(data.users));
        } catch (e) {

            if (e.response.status == 401) {
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

function addItemToPullList(token, email, item_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.patch(`${INVENTORY_URL}users/${email}/add_item`, { item_id }, config);
            dispatch(gotUser(data.user));
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

function removeItemFromPullList(token, email, item_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.patch(`${INVENTORY_URL}users/${email}/remove_item`, { item_id }, config);
            dispatch(gotUser(data.user));
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

function editUser(token, body, email) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.patch(`${INVENTORY_URL}users/${email}`, body, config);
            dispatch(gotUser(data.user));
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such user");
            } else if (e.response.status == 401) {
                throw (e.response.data.message);
            } else {
                throw (e);
            }
        }
    };
}

function addUser(token, body) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.post(`${INVENTORY_URL}users/signup`, body, config);
            dispatch(gotNewUser(data.user));
        } catch (e) {
            if (e.response.status == 401) {
                throw (e.response.data.message);
            } else {
                throw (e);
            }
        }
    };
}

function removeUser(token, email) {
    return async function () {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            await axios.delete(`${INVENTORY_URL}users/${email}`, config);
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such user");
            } else if (e.response.status == 401) {
                throw (e.response.data.message);
            } else {
                throw (e);
            }
        }
    };
}

function changePassword(token, email, oldPassword, newPassword) {
    return async function (dispatch) {
        const body = { existing_password: oldPassword, new_password: newPassword };
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const response = await axios.patch(`${INVENTORY_URL}users/${email}/change_password`, body, config);
            dispatch(gotCurrUser(response.data.user));
            if (response.status == 200) {
                alert("Password successfully changed");
            }
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such user");
            } else if (e.response.status == 401 || e.response.status == 400) {
                throw (e.response.data.message);
            } else {
                throw (e);
            }
        }
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

function logout() {
    return { type: LOGOUT };
}

export { loginUser, gotToken, logout, addItemToPullList, getCurrUser, removeItemFromPullList, getUser, editUser, addUser, getAllUsers, removeUser, changePassword };