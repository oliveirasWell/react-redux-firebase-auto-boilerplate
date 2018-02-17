export function msgReducer(state = null, action) {

    if (action.type === 'GLOBAL_ERROR') {
        return action.msg;
    }

    if (action.type === 'CLEAR') {
        return null;
    }

    return state;
}