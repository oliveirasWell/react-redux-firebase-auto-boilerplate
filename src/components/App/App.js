import React from 'react';
import DataTable from "../DataTable/DataTable";
import {Route} from 'react-router-dom';
import {FirebaseService} from "../../services/FirebaseService";
import NavigationWrapper from "../NavigationWrapper/NavigationWrapper";
import {firebaseAuth} from "../../utils/firebase";
import Header from "../Header/Header";
import {login, logout} from "../../actions/actionCreator";
import PropTypes from "prop-types"

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
        authUser: null,
        in: false,
    };

    componentWillMount(){
        this.setState({in: false});
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.context.store.dispatch(login(authUser));
                return this.setState(() => ({authUser}));
            } else {
                this.context.store.dispatch(logout());
                return this.setState(() => ({authUser: null}));
            }
        });

        FirebaseService.getAllLeituras(leituras => this.setState({data: leituras}), 20)
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
  store: PropTypes.object.required,
};

export default App;
