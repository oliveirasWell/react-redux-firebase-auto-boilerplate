import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {logout} from "../../actions/actionCreator";

class Logout extends Component {

    logout = () => {
        this.context.store.dispatch(logout());
        this.props.history.push('/login');
    };

    render() {
        return (
            <button onClick={this.logout}>Logout</button>
        );
    }
}

Logout.contextTypes = {
    store: PropTypes.object.required,
};

export default withRouter(Logout);
