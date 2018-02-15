import {userReducer} from "./userReducer";
import {msgReducer} from "./msgReducer";
import {combineReducers} from "redux";

export default combineReducers({userAuth: userReducer, msg: msgReducer});