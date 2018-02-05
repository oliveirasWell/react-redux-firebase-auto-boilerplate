import React from 'react';
import Logout from "../Logout/Logout";
import Fade from "../Fade/Fade";
import PropTypes from "prop-types";

const styles = {
    divAlert: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '600'
    }
};


class Header extends React.Component {
    state = {in: false, msg: '', userAuth:null};

    componentDidMount = () => {
        this.setState({in: true});
        this.context.store.subscribe(() => this.setState({msg: this.context.store.getState().msg}));
        this.context.store.subscribe(() => this.setState({userAuth: this.context.store.getState().userAuth}));
    };

    render = () => {
        return <Fade in={this.state.in}>
            <div style={{textAlign: 'right'}}>

                {this.state.msg != null && <div style={styles.divAlert}>{this.state.msg} </div>}

                {!!this.state.userAuth &&
                <span>{this.state.userAuth.displayName} <Logout/></span>}
            </div>
        </Fade>
    };
}

Header.contextTypes = {
    store: PropTypes.object.isRequired,
};

export default Header;