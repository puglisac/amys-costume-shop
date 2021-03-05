import { LOGOUT } from "./actionTypes";

export const errorHandler = (e, dispatch, cat) => {
    if (e.response.status == 404) {
        throw new Error(`No such ${cat}`);
    } else if (e.response.status == 401) {
        if (e.response.data.msg && e.response.data.msg == "Token has expired") {
            alert("Please log back in");
            dispatch({ type: LOGOUT });
        }
        else throw new Error(e.response.data.message);
    } else if (e.response) {
        throw new Error(e.response.data.message);
    } else {
        throw new Error(e);
    }
};