import React from 'react';
import PropTypes from 'prop-types';
import {firebaseAuth} from "../utils/firebase";

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
            };
        }

        getChildContext() {
            return {
                authUser: this.state.authUser,
            };
        }

        componentWillReceiveProps(props){
            this.props = props;
        }

        componentDidMount() {
            firebaseAuth.onAuthStateChanged(authUser => {
                return authUser
                    ? this.setState(() => ({ authUser }))
                    : this.setState(() => ({ authUser: null }));
            });
        }

        render() {
            return (
                <Component />
            );
        }
    }

    WithAuthentication.childContextTypes = {
        authUser: PropTypes.object,
    };

    return WithAuthentication;
};



export default withAuthentication;