import React, {Component} from 'react';
import {FirebaseService} from "../../services/FirebaseService";
import Table from "../Table/Table";
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import Login from "../Login/Login";
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

class App extends Component {

    static url = () => '/';

    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount = () => {
        firebaseAuth.onAuthStateChanged(authUser => {
            if (authUser == null) {
                this.props.history.push('/')
            }
        });
        FirebaseService.getAllLeituras(leituras => this.setState({data: leituras}), 20);
    };

    render() {
        return (
            <div style={styles.container}>
                <Route exact path={App.url()} component={Login}/>
                <Route path={Table.url()} render={() => <Table data={this.state.data}/>}/>
            </div>
        );
    }
}

export default withRouter(App);