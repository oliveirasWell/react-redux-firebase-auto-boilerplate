import React from "react";
import withAuthorization from "../withAuthorization";
import {FirebaseService} from "../../services/FirebaseService";
import GenericTable from "../GenericTable/GenericTable";
import {withRouter} from "react-router-dom";

class DataTable extends GenericTable {
    componentWillMount(){
        this.props.history.replace('/');
        this.setState({tittle:'Data Table'});

        if(!!this.props.store && !!this.props.store.getState()){
            this.props.history.push('/login');
        }
    }
}

export default withRouter(DataTable);