import GenericTable from "../FirebaseGenericTable/FirebaseGenericTable";
import {withRouter} from "react-router-dom";
import {isUserLogged} from "../../utils/session";

class DataTable extends GenericTable {
    componentWillMount() {
        this.props.history.replace('/');
        this.setState({tittle: 'Data Table'});
        isUserLogged(this.props.store, this.props.history);
    }
}

export default withRouter(DataTable);
