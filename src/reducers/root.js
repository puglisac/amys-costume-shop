import { combineReducers } from "redux";
import token from "./token";
import currUser from "./currUser";
import items from "./item";
import categories from './category';
import users from './user';

const rootReducer = combineReducers({ token, currUser, items, categories, users });

export default rootReducer;