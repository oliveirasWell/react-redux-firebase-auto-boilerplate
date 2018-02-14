import React from 'react';
import Logout from "../Logout/Logout";
import Fade from "../Fade/Fade";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {staticLinks} from "../../utils/staticLinks";
import FontAwesome from 'react-fontawesome';

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
        justifyContent: 'space-between',
        minHeight: '33px'
    },
    a: {marginRight: '5px', color: '#333'}
};

class Header extends React.Component {
    state = {in: false};

    componentDidMount = () => {
        this.setState({in: true});
    };

    render = () => {
        return <Fade in={this.state.in}>
            {
                this.props.msg != null &&
                <Fade in={this.props.msg != null && this.props.msg !== ''}>
                    <div style={styles.divAlert}>{this.props.msg}</div>
                </Fade>
            }

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                alignSelf: 'flex-end',
                marginBottom: '20px'
            }}>
                <a style={styles.a} href={staticLinks.github}><FontAwesome name='github'/></a>
                {/*<a style={styles.a} href={staticLinks.instagram}><FontAwesome name='instagram'/></a>*/}
                {/*<a style={styles.a} href={staticLinks.linkedin}><FontAwesome name='linkedin'/></a>*/}
                {/*<a style={styles.a} href={staticLinks.webSite}><FontAwesome name='mouse-pointer'/></a>*/}
            </div>

            <div style={styles.divFlex}>
                <div style={{...styles.div, ...styles.divFlex, float: 'left'}}>
                    <span style={{fontWeight: 900, color: '#000000'}}>React</span>
                    <span style={{fontWeight: 800, color: '#2f2f2f'}}>Redux</span>
                    <span style={{fontWeight: 700, color: '#484848'}}>Firebase</span>
                    <span> Example</span>
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