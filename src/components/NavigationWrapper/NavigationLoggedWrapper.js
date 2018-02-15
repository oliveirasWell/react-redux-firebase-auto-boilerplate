import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {ifLoggedGoToHome} from "../../utils/session";

const NavigationLoggedWrapper = ({userAuth, component, propsToInput}) => {
    return ifLoggedGoToHome(userAuth, component, propsToInput);
};

NavigationLoggedWrapper.contextTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default withRouter(connect(mapStateToProps)(NavigationLoggedWrapper));

