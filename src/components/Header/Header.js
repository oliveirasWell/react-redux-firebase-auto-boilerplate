import React from 'react';
import Logout from "../Logout/Logout";
import Fade from "../Fade/Fade";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const styles = {
    divAlert: {
        textAlign: 'center',
        color: '#b94424',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    div: {
        maxWidth: '50%',
        margin: '0'
    },
    divFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
};

class Header extends React.Component {
    state = {in: false, msg: '', userAuth: null};

    componentDidMount = () => {
        this.setState({in: true});
    };

    render = () => {
        return <Fade in={this.state.in}>
            {this.props.msg != null && <Fade in={this.props.msg != null && this.props.msg !== ''}>
                <div style={styles.divAlert}>{this.props.msg}</div>
            </Fade>}
            <div style={styles.divFlex}>
                <div style={{...styles.div, float: 'left'}}>
                    <span style={{fontWeight: 900, color: '#000000'}}>React</span><span
                    style={{fontWeight: 900, color: '#0e0e0e'}}>Redux</span><span
                    style={{fontWeight: 900, color: '#383838'}}>Firebase</span>Example
                </div>
                <div style={{...styles.div, float: 'right'}}>
                {!!this.props.userAuth &&
                <span>{this.props.userAuth.displayName} <Logout/></span>}
                </div>
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