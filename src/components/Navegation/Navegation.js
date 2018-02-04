import React from 'react';
import PropTypes from 'prop-types';
import DataTable from "../DataTable/DataTable";
import Login from "../Login/Login";

const Navigation = (props, { authUser }) => {

    return <div>
        {authUser
            ? <DataTable {...props} />
            : <Login/>
        }
    </div>;
};

Navigation.contextTypes = {
    authUser: PropTypes.object,
};

export default Navigation;