import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
import {globalError} from "../../actions/actionCreator";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome';
import {firebaseAuth, googleProvider} from "../../utils/firebase";
import {ifLoggedGoToHome} from "../../utils/session";

const styles = {
    container: {
        position: 'flex',
        margin: '2em',
        width: '50%',
    },
    input: {
        marginBottom: '5px',
        width: '100%',
        display: 'block'
    },
};

class Login extends Component {

    state = {
        clickedLogin: false,
        in: false
    };

    login = event => {
        event.preventDefault();

        this.setState({clickedLogin: true});
        const email = this.email.value;
        const password = this.password.value;

        FirebaseService.login(email, password)
            .then(() => {
                this.props.cleanMessages();
                this.props.history.push("/");
            })
            .catch(error => {
                this.props.sendError(error.message);
            });

        this.setState({clickedLogin: false});

    };

    googleLogin = event => {
        event.preventDefault();

        firebaseAuth.signInWithPopup(googleProvider)
            .then(r => {
                console.log(r);
                this.props.history.push("/");
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    componentWillMount() {
        this.setState({clickedLogin: false});
    }

    componentDidMount = () => {
        this.setState({in: true});
    };


    render() {
        const loginForm = <form onSubmit={this.login} style={styles.container}>
            <label>email</label>
            <br/>
            <input className={'circularInput'} required={true} style={styles.input} id="email" type="text"
                   ref={input => this.email = input}/>
            <br/>
            <label>password</label>
            <br/>
            <input className={'circularInput'} required={true} style={styles.input} type="password"
                   ref={input => this.password = input}/>
            <br/>
            <br/>
            <div>
                {this.state.clickedLogin && <FontAwesome name='bolt' spin/>}
            </div>
            <input style={styles.input} type="submit" value="login" className={'circularButton'}/>

            <button style={styles.input} onClick={this.googleLogin}
                    className={'circularButton'}>
                google login
            </button>
        </form>;


        return ifLoggedGoToHome(this.context.store, loginForm);
    }
}

Login.contextTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth};
};

const mapDispatchToProps = dispatch => {
    return {
        sendError: message => dispatch(globalError(message)),
        cleanMessages: () => dispatch(globalError(null))
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Login)
);