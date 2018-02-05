import FirebaseGenericTable from "../FirebaseGenericTable/FirebaseGenericTable";
import {withRouter} from "react-router-dom";
import {isUserLogged} from "../../utils/session";
import PropTypes from "prop-types";

class DataTable extends FirebaseGenericTable {
    componentWillMount() {
        this.props.history.replace('/');
        this.setState({tittle: 'Data Table'});
        isUserLogged(this.context.store, this.props.history);
    }
}

DataTable.contextTypes = {
    store: PropTypes.object.isRequired,
};

export default withRouter(DataTable);
