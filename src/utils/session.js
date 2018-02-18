import React from "react";
import {Redirect} from "react-router-dom";
import {routes} from "./custom/routes";

export const ifNotLoggedGoToLogin = (userAuth, Component, props) => {
    return userAuth != null
        ? <Component {...props}/>
        : <Redirect to={routes.login}/>
};

export const ifLoggedGoToHome = (userAuth, Component, props) => {
    return userAuth != null
        ? <Redirect to={routes.welcome}/>
        : <Component {...props}/>
};
