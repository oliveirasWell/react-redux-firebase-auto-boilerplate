import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError, clearGlobalMessages} from "../../actions/actionCreator";
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome';
import {firebaseAuth, googleProvider} from "../../utils/firebase";

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

        firebaseAuth.signInWithPopup(googleProvider)
            .then(r => {
                console.log(r);
                this.props.cleanMessages();
                this.props.history.push("/");
                this.setState({clickedLogin: false});
            })
            .catch(error => {
                console.log(error.message);
                this.setState({clickedLogin: false});
            });
    };

    render() {
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

                <div style={{textAlign: 'center', marginBottom: '5px'}}>
                    &nbsp; {this.state.clickedLogin && <FontAwesome name='bolt' spin/>}
                </div>
                <input style={styles.input} type="submit" value="login" className={'circularButton'}/>

                <button style={styles.input} onClick={this.googleLogin}
                        className={'circularButton'}>
                    google login
                </button>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Login)
);