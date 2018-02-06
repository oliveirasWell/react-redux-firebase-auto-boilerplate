import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
import Fade from "../Fade/Fade";
import {globalError} from "../../actions/actionCreator";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome';

const styles = {
    container: {
        position: 'flex',
        margin: '2em',
    },
    input: {
        marginBottom: '5px',
        width: '60%',
        display: 'block'
    },
};

class Login extends Component {

    state = {
        clickedLogin: false,
        in: false,
        userAuth: null
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

    componentWillMount() {
        this.setState({clickedLogin: false});
        if (this.props.userAuth !== null) {
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
                </form>
            </Fade>
        );
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

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Login);