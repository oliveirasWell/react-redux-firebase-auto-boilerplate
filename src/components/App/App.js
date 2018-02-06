import React from 'react';
import DataTable from "../DataTable/DataTable";
import {Route, withRouter} from 'react-router-dom';
import {FirebaseService} from "../../services/FirebaseService";
import NavigationWrapper from "../NavigationWrapper/NavigationWrapper";
import {firebaseAuth} from "../../utils/firebase";
import Header from "../Header/Header";
import {login, logout} from "../../actions/actionCreator";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import {nodes} from "../../utils/dataBaseNodes";

const styles = {
    container: {
        margin: '2em',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ddd',
        fontFamily: 'sans-serif',
    },
};

class App extends React.Component {

    state = {
        data: [],
        in: false,
    };

    componentWillMount(){
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

        FirebaseService.getAllDataBy(nodes.dataRoot, dataIn => this.setState({data: dataIn}), 20);
        this.setState({in: true});
    };

    render() {
        const propsTable = {
            dataList: this.state.data,
        };

        const propsNav = {
            ...propsTable,
            component: DataTable,
        };

        return (
                <div style={styles.container}>
                    <Header store={this.context.store}/>
                    <Route exact path={"/login"} render={() => <NavigationWrapper {...propsNav} />}/>
                    <Route exact path="/"        render={() => <DataTable {...propsTable}/>}/>
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
        logout: () => dispatch(dispatch(logout())),
    }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
