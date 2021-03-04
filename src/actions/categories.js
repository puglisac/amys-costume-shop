import axios from "axios";
import { INVENTORY_URL, GET_CATEGORIES, ADD_CATEGORY, REMOVE_CATEGORY, LOGOUT } from "./actionTypes";

function getAllCategories(token) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.get(`${INVENTORY_URL}categories/`, config);
            dispatch(gotCategories(data.categories));
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

function getOneCategory(token, category_id) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.get(`${INVENTORY_URL}categories/${category_id}`, config);
            dispatch(gotCategories(data.category));
        } catch (e) {
            if (e.response.status == 404) {
                throw ("No such category");
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

function addCategory(token, body) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.post(`${INVENTORY_URL}categories/`, body, config);
            dispatch(gotNewCategory(data.category));
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

function editCategory(token, body, categoryId) {
    return async function (dispatch) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.patch(`${INVENTORY_URL}categories/${categoryId}`, body, config);
            dispatch(gotCategories(data.category));
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

function removeCategory(token, categoryId) {
    return async function () {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            await axios.delete(`${INVENTORY_URL}categories/${categoryId}`, config);
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

function gotCategories(categories) {
    return { type: GET_CATEGORIES, payload: categories };
}

function gotNewCategory(category) {
    return { type: ADD_CATEGORY, payload: category };
}

export { getAllCategories, addCategory, getOneCategory, editCategory, removeCategory };