import FirebaseGenericTable from "../FirebaseGenericTable/FirebaseGenericTable";
import {withRouter} from "react-router-dom";
import {ifNotLoggedGoToLogin} from "../../utils/session";
import PropTypes from "prop-types";

class DataTable extends FirebaseGenericTable {
    componentWillMount() {
        this.setState({tittle: this.props.tittle});
    }

    render() {
        return ifNotLoggedGoToLogin(this.context.store, super.render());
    }
}

DataTable.contextTypes = {
    store: PropTypes.object.isRequired,
};

export default withRouter(DataTable);
