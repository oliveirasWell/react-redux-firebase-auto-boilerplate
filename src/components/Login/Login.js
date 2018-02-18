import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError, clearGlobalMessages} from "../../actions/actionCreator";
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome';
import {routes} from "../../utils/custom/routes";
import {compose} from "recompose";
import './Login.css';
import {canCreateNewUserOutsideApp, facebookLoginEnabled, googleLoginEnabled} from "../../utils/envHelper";

const styles = {
    a: {
        textDecoration: 'none',
    },
    input: {
        marginBottom: '5px',
        width: '100%',
        display: 'block'
    },
    divFontAwesome: {
        textAlign: 'center',
        marginBottom: '5px'
    },
};

class Login extends Component {

    state = {
        clickedLogin: false,
        in: false
    };

    loginDefaultActions = () => {
        this.setState({clickedLogin: true});
        this.props.cleanMessages();
    };

    login = event => {
        event.preventDefault();
        this.loginDefaultActions();

        const email = this.email.value;
        const password = this.password.value;

        FirebaseService.login(email, password)
            .then(() => {
                this.props.history.push(routes.root);
                this.setState({clickedLogin: false});
            })
            .catch(error => {
                this.props.addMessage(error.message);
                this.setState({clickedLogin: false});
            });
    };

    googleLogin = event => {
        event.preventDefault();
        this.loginDefaultActions();
        FirebaseService.createUserByGoogleAndAddToDataBase((message) => this.props.addMessage(message), (key) => this.props.history.push(key));
    };

    facebookLogin = event => {
        event.preventDefault();
        this.loginDefaultActions();

        FirebaseService.loginWithFacebook()
            .then(() => {
                this.props.history.push(routes.root);
                this.setState({clickedLogin: false});
            })
            .catch(error => {
                this.props.addMessage(error.message);
                this.setState({clickedLogin: false});
            });
    };

    componentDidMount() {
        this.props.cleanMessages();
    };

    render() {
        return <div className={'center'}>
            <form onSubmit={this.login} className='container'>
                <h1>Login</h1>

                <label>email</label>
                <br/>
                <input required={true} style={styles.input} id="email" type="text"
                       ref={input => this.email = input}/>
                <br/>
                <label>password</label>
                <br/>
                <input required={true} style={styles.input} type="password"
                       ref={input => this.password = input}/>
                <br/>

                <div style={styles.divFontAwesome}>
                    &nbsp; {this.state.clickedLogin && <FontAwesome name='bolt' spin/>}
                </div>
                <input style={styles.input} type="submit" value="login" className={'circularButton'}/>

                {
                    googleLoginEnabled &&
                    <button style={styles.input} onClick={this.googleLogin}
                            className={'circularButton'}>
                        google login
                    </button>
                }

                {
                    facebookLoginEnabled &&
                    <button style={styles.input} onClick={this.facebookLogin} className={'circularButton'}>
                        facebook login
                    </button>
                }

                {
                    canCreateNewUserOutsideApp &&
                    <Link to={routes.newUser} style={styles.a}>
                        <button style={{...styles.input}} className={'circularButton'}>
                            new user
                        </button>
                    </Link>
                }
            </form>
        </div>;
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addMessage: message => dispatch(addGlobalError(message)),
        cleanMessages: () => dispatch(clearGlobalMessages())
    };
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(Login);