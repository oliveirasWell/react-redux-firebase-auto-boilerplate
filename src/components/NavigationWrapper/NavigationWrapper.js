import {connect} from "react-redux";
import {ifNotLoggedGoToLogin} from "../../utils/session";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";

const NavigationWrapper = ({userAuth, component, ...otherProps}) => {
    return ifNotLoggedGoToLogin(userAuth, component, otherProps);
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default compose(withRouter, connect(mapStateToProps))(NavigationWrapper);
