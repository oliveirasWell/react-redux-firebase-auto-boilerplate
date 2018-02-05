export const isUserLogged = (store, history) => {
    if (store.getState() == null) {
        history.push('/login');
    }
};
