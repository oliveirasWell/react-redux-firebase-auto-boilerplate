import React from 'react';
import Logout from "../Logout/Logout";
import Fade from "../Fade/Fade";

const styles = {
    divAlert: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '600'
    }
};

export default class Header extends React.Component {
    state = {in: false, msg: ''};

    componentDidMount = () => {
        this.setState({in: true});
        this.props.store.subscribe(() => this.setState({msg: this.props.store.getState().msg}));
    };

    render = () => {
        return <Fade in={this.state.in}>
            <div style={{textAlign: 'right'}}>

                {this.props.store.msg != null && <div style={styles.divAlert}>{this.props.store.msg} </div>}

                {!!this.props.store.getState().userAuth &&
                <span>{this.props.store.getState().userAuth.displayName} <Logout store={this.props.store}/></span>}
            </div>
        </Fade>
    };
};

