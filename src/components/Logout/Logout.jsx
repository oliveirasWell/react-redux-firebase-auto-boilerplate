import React, {Component} from 'react';
import {FirebaseService} from "../../services/FirebaseService";
import {withRouter} from "react-router-dom";
import Login from "../Login/Login";


class Logout extends Component {

    logout = () => {
        FirebaseService.logout()
            .then(() => this.props.history.push(Login.url()))
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