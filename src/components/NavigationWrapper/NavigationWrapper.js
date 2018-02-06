import React from 'react';
import Login from "../Login/Login";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class NavigationWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.Component = props.component;
    }

    render() {
        return <div>
            {this.props.userAuth != null && this.props.userAuth !== undefined
                ? <this.Component {...this.props} />
                : <Login {...this.props}/>
            }
        </div>
    }
}

NavigationWrapper.contextTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default connect(mapStateToProps)(NavigationWrapper);
