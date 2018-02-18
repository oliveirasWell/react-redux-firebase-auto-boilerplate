import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {logout} from "../../actions/actionCreator";
import {connect} from "react-redux";
import {compose} from "recompose";
import {routes} from "../../utils/custom/routes";

class Logout extends Component {

    click = () => {
        this.props.logout();
        this.props.history.push(routes.login);
    };

    render() {
        return <button className={'circularButton'} onClick={this.click}>logout</button>;
    }
}

const mapDispatchToProps = dispatch => {
    return {logout: () => dispatch(logout())};
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(Logout);