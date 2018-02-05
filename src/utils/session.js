export const isUserLogged = (store, history) => {
    if (store.getState().userAuth == null) {
        history.push('/login');
    }
};
