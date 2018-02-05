import {FirebaseService} from "../services/FirebaseService";
import {createStore} from "redux";

function userReducer(state = null, action) {
    if (action.type === 'LOGIN') {
        return action.user;
    }

    if (action.type === 'LOGOUT') {
        FirebaseService.logout();
        return null;
    }

    return state;
}

export const store = createStore(userReducer);