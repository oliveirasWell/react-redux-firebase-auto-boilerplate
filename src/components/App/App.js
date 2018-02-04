import React from 'react';
import DataTable from "../DataTable/DataTable";
import withAuthentication from "../withAuthentication";
import {Route} from 'react-router-dom';
import {FirebaseService} from "../../services/FirebaseService";
import Navigation from "../Navegation/Navegation";
import Login from "../Login/Login";


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

    state = {data: []};

    componentWillMount = () => FirebaseService.getAllLeituras(leituras => this.setState({data: leituras}), 20);

    render() {
        return (
            <div style={styles.container}>
                <Route exact path={"/login"} render={() => <Navigation component={DataTable} dataList={this.state.data}/>}/>
                <Route exact path="/" render={() => <DataTable dataList={this.state.data}/>}/>
            </div>
        );
    };
}

export default withAuthentication(App)
