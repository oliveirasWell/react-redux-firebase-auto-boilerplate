import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
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
        msg: ''
    };

    login = event => {
        event.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        FirebaseService.login(email, password)
            .then(() => this.props.history.push("/"))
            .catch(error => this.setState({msg: error.message}));
    };


    componentWillMount(){
        if(this.props.store.getState() !== null) {
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <form onSubmit={this.login} style={styles.container}>
                <div> {this.state.msg} </div>
                <label>email</label>
                <br/>
                <input required={true} style={styles.input} id="email" type="text" ref={input => this.email = input}/>
                <br/>
                <label>password</label>
                <br/>
                <input required={true} style={styles.input} type="password" ref={input => this.password = input}/>
                <br/>
                <br/>
                <input style={styles.input} type="submit" value="login"/>
            </form>
        );
    }
}

Login.contextTypes = {
    authUser: PropTypes.object,
};

export default withRouter(Login);