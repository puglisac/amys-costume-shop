import { combineReducers } from "redux";
import token from "./token";
import currUser from "./currUser";

const rootReducer = combineReducers({ token, currUser });

export default rootReducer;