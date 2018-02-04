import React from "react";
import withAuthorization from "../withAuthorization";
import {FirebaseService} from "../../services/FirebaseService";
import GenericTable from "../GenericTable/GenericTable";

class DataTable extends GenericTable {
    componentWillMount(){
        this.props.history.replace('/');
        this.setState({tittle:'Data Table'})
    }

}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(DataTable)