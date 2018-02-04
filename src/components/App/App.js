import React from 'react';
import DataTable from "../DataTable/DataTable";
import withAuthentication from "../withAuthentication";
import {Route} from 'react-router-dom';
import {FirebaseService} from "../../services/FirebaseService";
import NavigationWrapper from "../NavigationWrapper/NavigationWrapper";
import {createStore} from 'redux';
import {firebaseAuth} from "../../utils/firebase";

const styles = {
    container: {
        margin: '2em',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ddd',
        fontFamily: 'sans-serif',
    },
};




function usuario(state=null, action) {

    console.log(action);

    if (action.type === 'LOGIN') {
        return action.user;
    }

    if (action.type === 'LOGOUT') {
        FirebaseService.logout();
        return null;
    }

    return state;
}

const store = createStore(usuario);

class App extends React.Component {

    state = {data: []};

    componentWillMount = () => {
        firebaseAuth.onAuthStateChanged(authUser => {
            return authUser
                ? store.dispatch({type:'LOGIN', user:authUser})
                : store.dispatch({type:'LOGOUT'});
        });

        FirebaseService.getAllLeituras(leituras => this.setState({data: leituras}), 20)
    };

    render() {
        return (
            <div style={styles.container}>
                <Route exact path={"/login"} render={() => <NavigationWrapper component={DataTable} dataList={this.state.data}/>}/>
                <Route exact path="/" render={() => <DataTable dataList={this.state.data} store={store}/>}/>
            </div>
        );
    };
}

export default withAuthentication(App)
