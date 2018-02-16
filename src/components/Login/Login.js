import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError, clearGlobalMessages} from "../../actions/actionCreator";
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome';
import {routes as nodes} from "../../utils/routes";
import {compose} from "recompose";


const styles = {
    container: {
        position: 'flex',
        margin: '0 auto',
        width: '40%',
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

    login = event => {
        event.preventDefault();
        this.setState({clickedLogin: true});
        this.props.cleanMessages();

        const email = this.email.value;
        const password = this.password.value;

        FirebaseService.login(email, password)
            .then(() => {
                this.props.cleanMessages();
                this.props.history.push(nodes.root);
                this.setState({clickedLogin: false});
            })
            .catch(error => {
                this.props.sendError(error.message);
                this.setState({clickedLogin: false});
            });
    };

    googleLogin = event => {
        event.preventDefault();
        this.setState({clickedLogin: true});
        this.props.cleanMessages();

        FirebaseService.loginWithGoogle()
            .then(r => {
                this.props.cleanMessages();
                this.props.history.push(nodes.root);
                this.setState({clickedLogin: false});
            })
            .catch(error => {
                this.props.sendError(error.message);
                this.setState({clickedLogin: false});
            });
    };

    facebookLogin = event => {
        event.preventDefault();
        this.setState({clickedLogin: true});
        this.props.cleanMessages();

        FirebaseService.loginWithFacebook()
            .then(r => {
                console.log(r);
                this.props.cleanMessages();
                this.props.history.push(nodes.root);
                this.setState({clickedLogin: false});
            })
            .catch(error => {
                this.props.sendError(error.message);
                this.setState({clickedLogin: false});
            });
    };

    componentDidMount() {
        this.props.cleanMessages();
    };

    render() {
        const showFacebookLogin = process.env.REACT_APP_FACEBOOK_LOGIN_ENABLE === 'true';
        const showGoogleLogin = process.env.REACT_APP_GOOGLE_LOGIN_ENABLE === 'true';

        return <div className={'center'}>
            <form onSubmit={this.login} style={styles.container}>
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

                <div style={styles.divFontAwesome}>
                    &nbsp; {this.state.clickedLogin && <FontAwesome name='bolt' spin/>}
                </div>
                <input style={styles.input} type="submit" value="login" className={'circularButton'}/>

                {
                    showGoogleLogin &&
                    <button style={styles.input} onClick={this.googleLogin}
                            className={'circularButton'}>
                        google login
                    </button>
                }

                {
                    showFacebookLogin &&
                    <button style={styles.input} onClick={this.facebookLogin} className={'circularButton'}>
                        facebook login
                    </button>
                }
            </form>
        </div>;
    }
}


const mapStateToProps = state => {
    return {userAuth: state.userAuth};
};

const mapDispatchToProps = dispatch => {
    return {
        sendError: message => dispatch(addGlobalError(message)),
        cleanMessages: () => dispatch(clearGlobalMessages())
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Login);