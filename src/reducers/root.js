import { combineReducers } from "redux";
import token from "./token";
import currUser from "./currUser";
import items from "./item";
import categories from './category';

const rootReducer = combineReducers({ token, currUser, items, categories });

export default rootReducer;