import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ifNotLoggedGoToLogin} from "../../utils/session";

class NavigationWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.Component = props.component;
    }

    render() {
        return ifNotLoggedGoToLogin(this.context.store, this.Component);
    }
}

NavigationWrapper.contextTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default connect(mapStateToProps)(NavigationWrapper);
