import React from "react";
import {Redirect} from "react-router-dom";

export const ifNotLoggedGoToLogin = (store, Component) => {
    return store.getState().userAuth != null
        ? <Component/>
        : <Redirect to={'/login'}/>
};

export const ifLoggedGoToHome = (store, Component) => {
    return store.getState().userAuth == null
        ? <Component/>
        : <Redirect to={'/welcome'}/>
};
