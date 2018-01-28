import React, {Component} from 'react';
import {FirebaseService} from "../../services/FirebaseService";
import App from "../App/App";
import {withRouter} from "react-router-dom";


class Logout extends Component {

    state = {
        msg: ''
    };

    logout = () => {
        FirebaseService.logout()
            .then(() => this.props.history.push(App.url()))
            .catch(error => this.setState({msg: error.message}));
    };

    render() {
        return (
            <div>{!!this.state.msg && (this.state.msg(<br/>))}
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }

}

export default withRouter(Logout);