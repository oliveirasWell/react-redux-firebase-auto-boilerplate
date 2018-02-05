import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
import Fade from "../Fade/Fade";
import {globalError} from "../../actions/actionCreator";
import PropTypes from "prop-types";

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: '15em',
        position: 'flex',
        margin: '2em',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ddd',
        fontFamily: 'sans-serif',
    },
    input: {
        margin: '5px',
        width: '20em',
    },

};

class Login extends Component {

    state = {
        in: false
    };

    login = event => {
        event.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        FirebaseService.login(email, password)
            .then(() => {
                this.context.store.dispatch(globalError(null));
                this.props.history.push("/");
            })
            .catch(error => {
                this.context.store.dispatch(globalError(error.message))
            });
    };

    componentWillMount() {
        if (this.context.store.getState().userAuth !== null) {
            this.props.history.push("/")
        }
    }

    componentDidMount = () => this.setState({in: true});

    render() {
        return (
            <Fade in={this.state.in}>
                <form onSubmit={this.login} style={styles.container}>
                    <label>email</label>
                    <br/>
                    <input required={true} style={styles.input} id="email" type="text"
                           ref={input => this.email = input}/>
                    <br/>
                    <label>password</label>
                    <br/>
                    <input required={true} style={styles.input} type="password" ref={input => this.password = input}/>
                    <br/>
                    <br/>
                    <input style={styles.input} type="submit" value="login"/>
                </form>
            </Fade>
        );
    }
}

Login.contextTypes = {
    store: PropTypes.object.isRequired,
};

export default withRouter(Login);
