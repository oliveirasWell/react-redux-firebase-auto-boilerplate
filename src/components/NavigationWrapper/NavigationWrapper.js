import React from 'react';
import Login from "../Login/Login";
import PropTypes from "prop-types";

class NavigationWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.Component = props.component;
        this.state = {userAuth:null};
    }


    componentDidMount = () => {
        this.context.store.subscribe(() => this.setState({userAuth: this.context.store.getState().userAuth}));
    };

    render() {
        return <div>
            {this.state.userAuth != null
                ? <this.Component {...this.props} />
                : <Login {...this.props}/>
            }
        </div>
    }
}

NavigationWrapper.contextTypes = {
    store: PropTypes.object.isRequired,
};

export default NavigationWrapper;
