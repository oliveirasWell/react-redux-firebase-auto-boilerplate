export const login = (user) => {
    return {user: {displayName: user.displayName}, type: 'LOGIN'}
};

export const logout = () => {return {type:'LOGOUT'}};

export const globalError = (msg) => {return {type:'GLOBAL_ERROR', msg}};