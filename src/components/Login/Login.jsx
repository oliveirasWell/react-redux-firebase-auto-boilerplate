import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Table from "../Table/Table";
import {FirebaseService} from "../../services/FirebaseService";

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
            .then(() => this.props.history.push(Table.url()))
            .catch(error => this.setState({msg: error.message}));
    };

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

export default withRouter(Login);