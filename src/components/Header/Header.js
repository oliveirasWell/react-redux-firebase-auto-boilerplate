import React from 'react';
import Logout from "../Logout/Logout";
import Fade from "../Fade/Fade";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const styles = {
    divAlert: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '600'
    },
    div: {
        textAlign: 'right'
    }
};

class Header extends React.Component {
    state = {in: false, msg: '', userAuth: null};

    componentDidMount = () => {
        this.setState({in: true});
    };

    render = () => {
        return <Fade in={this.state.in}>
            <div style={styles.div}>
                {this.props.msg != null && <div style={styles.divAlert}>{this.props.msg} </div>}
                {!!this.props.userAuth &&
                <span>{this.props.userAuth.displayName} <Logout/></span>}
            </div>
        </Fade>
    };
}

Header.contextTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        userAuth: state.userAuth,
        msg: state.msg
    }
};

export default connect(mapStateToProps, null)(Header);