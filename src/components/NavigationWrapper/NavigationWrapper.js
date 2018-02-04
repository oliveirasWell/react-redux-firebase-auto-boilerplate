import React from 'react';
import PropTypes from 'prop-types';
import Login from "../Login/Login";

const NavigationWrapper = (props, { authUser }) => {

    const Component = props.component;

    return <div>
        {authUser
            ? <Component {...props} />
            : <Login/>
        }
    </div>;
};

NavigationWrapper.contextTypes = {
    authUser: PropTypes.object,
};

export default NavigationWrapper;