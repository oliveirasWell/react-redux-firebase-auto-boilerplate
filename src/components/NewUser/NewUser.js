import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError, clearGlobalMessages} from "../../actions/actionCreator";
import {connect} from "react-redux";
import {compose} from "recompose";
import {routes} from "../../utils/routes";

const styles = {
    input: {
        marginBottom: '5px',
        width: '100%',
        display: 'block'
    },
};

class NewUser extends Component {

    newUSer = event => {
        event.preventDefault();
        const email = this.email.value;
        const password = this.password.value;
        const name = this.name.value;
        FirebaseService.createUserAndAddToDataBase(email, password, name, (message) => this.props.addMessage(message), () => this.props.history.push(routes.newUser));
    };

    componentWillMount() {
        this.props.cleanMessages();
    };

    render() {
        return <div className={'center'}>
            <form onSubmit={this.newUSer} className='container'>
                <h1>New User</h1>

                <label>name</label>
                <br/>
                <input className={'circularInput'} required style={styles.input} id="name" type="text"
                       ref={input => this.name = input}/>
                <br/>
                <label>email</label>
                <br/>
                <input className={'circularInput'} required style={styles.input} id="email" type="text"
                       ref={input => this.email = input}/>
                <br/>
                <label>password</label>
                <br/>
                <input className={'circularInput'} required style={styles.input} type="password"
                       ref={input => this.password = input}/>
                <br/>

                <input style={styles.input} type="submit" value="create" className={'circularButton'}/>
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
)(NewUser);