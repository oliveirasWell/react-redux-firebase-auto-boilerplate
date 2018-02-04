import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {firebaseAuth} from "../utils/firebase";
import Login from "./Login/Login";

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {

        componentDidMount() {
            firebaseAuth.onAuthStateChanged(authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push(Login.url());
                }
            });
        }

        render() {
            return this.context.authUser ? <Component {...this.props}/> : <div>usuario não logado</div>;
        }
    }

    WithAuthorization.contextTypes = {
        authUser: PropTypes.object,
    };

    return withRouter(WithAuthorization);
};

export default withAuthorization;