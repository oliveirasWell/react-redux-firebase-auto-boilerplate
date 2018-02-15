import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {ifLoggedGoToHome} from "../../utils/session";

const NavigationLoggedWrapper = ({userAuth, component, ...otherProps}) => {
    return ifLoggedGoToHome(userAuth, component, otherProps);
};

NavigationLoggedWrapper.contextTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default withRouter(connect(mapStateToProps)(NavigationLoggedWrapper));

