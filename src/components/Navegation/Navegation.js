import React from 'react';
import PropTypes from 'prop-types';
import DataTable from "../DataTable/DataTable";
import Login from "../Login/Login";

const Navigation = (props, { authUser }) => {

    const Component = props.component;

    return <div>
        {authUser
            ? <Component {...props} />
            : <Login/>
        }
    </div>;
};

Navigation.contextTypes = {
    authUser: PropTypes.object,
};

export default Navigation;