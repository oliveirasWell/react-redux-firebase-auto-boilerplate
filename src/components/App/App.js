import React from 'react';
import DataTable from "../DataTable/DataTable";
import {Route} from 'react-router-dom';
import {FirebaseService} from "../../services/FirebaseService";
import NavigationWrapper from "../NavigationWrapper/NavigationWrapper";
import {firebaseAuth} from "../../utils/firebase";
import {store} from "../../reducers/userReducer";
import {Header} from "../Header/Header";

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

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            authUser: null,
        };
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(authUser => {
            if (authUser) {
                store.dispatch({type: 'LOGIN', user: authUser});
                return this.setState(() => ({authUser}));
            } else {
                store.dispatch({type: 'LOGOUT'});
                return this.setState(() => ({authUser: null}));
            }
        });

        FirebaseService.getAllLeituras(leituras => this.setState({data: leituras}), 20)
    };

    render() {
        return (
            <div style={styles.container}>
                <Header store={store}/>
                <Route exact path={"/login"}
                       render={() => <NavigationWrapper component={DataTable} dataList={this.state.data}
                                                        store={store}/>}/>
                <Route exact path="/" render={() => <DataTable dataList={this.state.data} store={store}/>}/>
            </div>
        );
    };
}


export default App;
