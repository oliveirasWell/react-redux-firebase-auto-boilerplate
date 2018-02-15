export const login = (user) => {
    return {user, type: 'LOGIN'}
};

export const logout = () => {return {type:'LOGOUT'}};

export const addGlobalError = (msg) => {
    return {type: 'GLOBAL_ERROR', msg}
};

export const clearGlobalMessages = () => {
    return {type: 'CLEAR'}
};

