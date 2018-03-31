import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import NavigationWrapper from "../NavigationWrappers/NavigationWrapper";
import Header from "../Header/Header";
import {login, logout} from "../../actions/actionCreator";
import {connect} from "react-redux";
import {routes} from "../../utils/custom/routes";
import Welcome from "../Welcome/Welcome";
import {NoMatch} from "../NoMatch/NoMatch";
import Login from "../Login/Login";
import NavigationLoggedWrapper from "../NavigationWrappers/NavigationLoggedWrapper";
import DataTable from "../DataTable/DataTable";
import {compose} from "recompose";
import {FirebaseService} from "../../services/FirebaseService";
import {Footer} from "../Footer/Footer";
import NewUser from "../NewUser/NewUser";
import FirebaseNodeElement from "../FirebaseNodeElement/FirebaseNodeElement";
import AccessDenied from "../AccessDenied/AccessDenied";

const styles = {
    container: {
        paddingLeft: '3em',
        paddingRight: '3em'
    }
};

class App extends React.Component {

    componentDidMount() {
        FirebaseService.onAuthChange(
            (authUser) => this.props.login(authUser),
            () => this.props.logout()
        );
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div style={styles.container}>
                    <Switch>
                        <Route exact path={routes.login}
                               render={(props) => <NavigationLoggedWrapper component={Login} {...props}/>}/>

                        <Route exact path={routes.newUser}
                               render={(props) => <NavigationLoggedWrapper component={NewUser} {...props}/>}/>

                        <Route exact path={routes.welcome}
                               render={(props) => <NavigationWrapper component={Welcome}     {...props}/>}/>

                        <Route exact path={routes.accessDenied}
                               render={(props) => <NavigationWrapper component={AccessDenied}     {...props}/>}/>

                        <Route exact path={routes.data}
                               render={(props) => <NavigationWrapper component={DataTable}   {...props}/>}/>

                        <Route exact path={routes.edit}
                               render={(props) => <NavigationWrapper component={FirebaseNodeElement} {...props} isEdit/>}/>

                        <Route exact path={routes.new}
                               render={(props) => <NavigationWrapper component={FirebaseNodeElement} {...props} isEdit={false}/>}/>

                        <Redirect exact from={routes.root} to={routes.welcome}/>

                        <Route render={(props) => <NavigationWrapper component={NoMatch}   {...props}/>}/>
                    </Switch>
                </div>
                <Footer/>
            </React.Fragment>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: authUser => dispatch(login(authUser)),
        logout: () => dispatch(logout()),
    }
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(App);
