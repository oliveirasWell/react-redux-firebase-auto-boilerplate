import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {logout} from "../../actions/actionCreator";
import {connect} from "react-redux";
import {compose} from "recompose";

class Logout extends Component {

    click = () => {
        this.props.logout();
        this.props.history.push('/login');
    };

    render() {
        return (
            <button onClick={this.click}>Logout</button>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {logout: () => dispatch(logout())};
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(Logout);