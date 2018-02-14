import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {FirebaseService} from "../../services/FirebaseService";
import NavigationWrapper from "../NavigationWrapper/NavigationWrapper";
import {firebaseAuth} from "../../utils/firebase";
import Header from "../Header/Header";
import {login, logout} from "../../actions/actionCreator";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import {nodes} from "../../utils/dataBaseNodes";
import {routes} from "../../utils/routes";
import Welcome from "../Welcome/Welcome";
import {NoMatch} from "../NoMatch/NoMatch";
import Login from "../Login/Login";
import FirebaseGenericTable from "../FirebaseGenericTable/FirebaseGenericTable";

const styles = {
    container: {
        fontFamily: 'sans-serif',
    },
};


class App extends React.Component {

    state = {
        data: [],
        in: false,
        activeTab: null,
        node: null
    };

    componentWillMount() {
        this.setState({in: false});
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.props.login(authUser);
            } else {
                this.props.logout();
            }
        });

        this.setState({in: true});
    };

    redirectAndRender(node) {
        this.setState(() => {
            return {activeTab: node.key, node: node}
        });

        FirebaseService.getAllDataBy(node, dataIn => this.setState({data: dataIn}), 20, c => node.flat(c), null);
    }

    render() {
        const propsTable = {
            ...this.props,
            dataList: this.state.data,
            title: this.state.node ? this.state.node.name : null,
        };

        const propsNav = {
            ...propsTable,
        };

        const nodesList = Object.values(nodes);

        return (
            <div style={styles.container}>
                <Header/>
                <nav>
                    {
                        nodesList.map((node, key) => {
                            const styleOfTab = node.key === this.state.activeTab ? {fontWeight: 900} : {fontWeight: 100};
                            return node.path && <a key={key} onClick={() => this.redirectAndRender(node)}
                                                   style={{...styleOfTab, marginRight: '5px'}}>{node.name}</a>
                        })
                    }
                </nav>

                <Switch>
                    <Route exact path={routes.login} render={() => <Login {...propsNav}/>}/>
                    <Route exact path={routes.data}
                           render={() => <NavigationWrapper {...propsNav} component={FirebaseGenericTable}/>}/>
                    <Route exact path={routes.welcome}
                           render={() => <NavigationWrapper {...propsNav} component={Welcome}/>}/>
                    <Redirect from="/" to="/welcome"/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        );
    };
}

App.contextTypes = {
    store: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        login: authUser => dispatch(login(authUser)),
        logout: () => dispatch(logout()),
    }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
