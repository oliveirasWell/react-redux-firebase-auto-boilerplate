import {FirebaseService} from "../services/FirebaseService";

export function userReducer(state = null, action) {
    if (action.type === 'LOGIN') {
        return action.user;
    }

    if (action.type === 'LOGOUT') {
        FirebaseService.logout();
        return null;
    }

    return state;
}

