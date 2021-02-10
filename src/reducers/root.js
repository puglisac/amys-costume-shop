import { combineReducers } from "redux";
import token from "./token";
import currUser from "./currUser";
import items from "./item";

const rootReducer = combineReducers({ token, currUser, items });

export default rootReducer;