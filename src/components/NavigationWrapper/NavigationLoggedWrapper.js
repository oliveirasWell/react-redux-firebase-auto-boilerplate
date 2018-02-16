import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {ifLoggedGoToHome} from "../../utils/session";

const NavigationLoggedWrapper = ({userAuth, component, ...otherProps}) => {
    return ifLoggedGoToHome(userAuth, component, otherProps);
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default withRouter(connect(mapStateToProps)(NavigationLoggedWrapper));

