import React from 'react';
import Logout from "../Logout/Logout";
import Fade from "../Fade/Fade";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {socialLinks} from "../../utils/staticLinks";
import FontAwesome from 'react-fontawesome';
import {routes} from "../../utils/routes";
import {Link} from "react-router-dom";

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
    a: {
        marginRight: '5px', color: '#333'
    },
    socialLinks: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-end',
        marginBottom: '20px'
    },
    divTittle: {
        float: 'left'
    },
    link: {
        textDecoration: 'none'
    },
    blackBoldTittle: {
        fontWeight: 900, color: '#000000'
    },
    darkGreyBoldTittle: {
        fontWeight: 800, color: '#2f2f2f'
    },
    darkGreyTittle: {
        fontWeight: 700, color: '#484848'
    },
    darkGreyLightTittle: {
        fontWeight: 100, color: '#484848'
    },
    userName: {
        float: 'right'
    }

};

class Header extends React.Component {
    state = {in: false};

    componentDidMount() {
        this.setState({in: true});
    };

    render() {
        return <Fade in={this.state.in}>
            <div className={'center'}>
                {
                    this.props.msg != null &&
                    <Fade in={this.props.msg != null && this.props.msg !== ''}>
                        <div style={styles.divAlert}>{this.props.msg}</div>
                    </Fade>
                }

                <div style={styles.socialLinks}>
                    <a style={styles.a} href={socialLinks.github}><FontAwesome name='github'/></a>
                </div>

                <div style={styles.divFlex}>
                    <div style={{...styles.divTittle, ...styles.div, ...styles.divFlex}}>
                        <Link to={routes.root} style={styles.link}>
                            <span style={styles.blackBoldTittle}>React</span>
                            <span style={styles.darkGreyBoldTittle}>Redux</span>
                            <span style={styles.darkGreyTittle}>Firebase</span>
                            <span style={styles.darkGreyLightTittle}> Example</span>
                        </Link>
                    </div>
                    <div style={{...styles.div, ...styles.userName}}>
                        {!!this.props.userAuth && <span>{this.props.userAuth.displayName} <Logout/></span>}
                    </div>
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