export function msgReducer(state = null, action) {

    if (action.type === 'GLOBAL_ERROR') {
        return action.msg;
    }

    return state;
}