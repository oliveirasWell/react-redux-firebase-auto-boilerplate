import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class Logout extends Component {

    logout = () => {
        this.props.store.dispatch({type:'LOGOUT'});
        this.props.history.push('/login');
    };

    render() {
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }

}

export default withRouter(Logout);