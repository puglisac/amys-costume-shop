import axios from "axios";
import { INVENTORY_URL, GET_ITEMS } from "./actionTypes";

function getAllItems(token, category_id = null) {
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

        }
        catch (e) {
            throw new Error(e.response.data.msg);
        }
    };
}


function gotItems(items) {
    return { type: GET_ITEMS, payload: items };
}


export { getAllItems };