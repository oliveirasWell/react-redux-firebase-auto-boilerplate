import React from 'react';
import {connect} from "react-redux";
import {ifNotLoggedGoToLogin} from "../../utils/session";
import {withRouter} from "react-router-dom";

const NavigationWrapper = ({userAuth, component, ...otherProps}) => {
    return ifNotLoggedGoToLogin(userAuth, component, otherProps);
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default withRouter(connect(mapStateToProps)(NavigationWrapper));
