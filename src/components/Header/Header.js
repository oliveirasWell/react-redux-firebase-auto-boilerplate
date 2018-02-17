import React from 'react';
import Logout from "../Logout/Logout";
import Fade from "../Fade/Fade";
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome';
import {routes} from "../../utils/routes";
import {Link} from "react-router-dom";
import {clearGlobalMessages} from "../../actions/actionCreator";

const styles = {

    divAlertParent: {
        position: 'absolute',
        left: '50%',
    },
    divAlert: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '500',
        position: 'relative',
        top: '10px',
        left: '-50%',
        borderRadius: '290486px',
        background: '#0e0e0e',
        fontSize: '0.7em',
        padding: '1em 2em',
        transition: 'background 200ms ease-in-out',

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
    divTittle: {
        float: 'left'
    },
    link: {
        textDecoration: 'none',
        color: '#566b78'
    },
    blackBoldTittle: {
        fontWeight: 600,
    },
    darkGreyBoldTittle: {
        fontWeight: 500,
    },
    darkGreyTittle: {
        fontWeight: 400,
    },
    darkGreyLightTittle: {
        fontWeight: 200,
    },
    userName: {
        float: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    close: {
        position: 'relative',
        top: '-5px',
        left: '5px',
        color: '#acacac',
        cursor: 'pointer'
    },
    image: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        margin: '0 5px 5px',
    }
};

class Header extends React.Component {
    state = {in: false};

    componentDidMount() {
        this.setState({in: true});
    };

    render() {
        return <Fade in={this.state.in}>
            <div className={'center fixed-top'}>
                {
                    this.props.msg != null && this.props.msg !== '' &&
                    <Fade in={this.props.msg != null && this.props.msg !== ''} out={this.props.msg == null}>
                        <div style={styles.divAlertParent}>
                            <div style={styles.divAlert}>
                                <FontAwesome name='exclamation-triangle'/> {this.props.msg}

                                <a style={styles.close} onClick={this.props.cleanMessages}>x</a>
                            </div>
                        </div>
                    </Fade>
                }

                <div style={styles.divFlex}>
                    <div style={{...styles.divTittle, ...styles.div, ...styles.divFlex}}>
                        <Link to={routes.root} style={styles.link}>
                            <span style={styles.blackBoldTittle}>React</span>
                            <span style={styles.darkGreyBoldTittle}>Redux</span>
                            <span style={styles.darkGreyTittle}>Firebase</span>
                            <span style={styles.darkGreyLightTittle}>Example</span>
                        </Link>
                    </div>

                    {
                        !!this.props.userAuth &&
                        <div style={{...styles.div, ...styles.userName, ...styles.divFlex}}>
                            {!!this.props.userAuth.photoURL && <img src={this.props.userAuth.photoURL} style={styles.image}/>}
                            <Logout/>
                        </div>
                    }
                </div>
            </div>
        </Fade>
    };
}

const mapStateToProps = state => {
    return {
        userAuth: state.userAuth,
        msg: state.msg
    }
};

const mapDispatchToProps = dispatch => {
    return {
        cleanMessages: () => dispatch(clearGlobalMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);