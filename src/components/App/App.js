import React, {Component} from 'react';
import {FirebaseService} from "../../services/FirebaseService";
import Table from "../Table/Table";

const styles = {
    container: {
        margin: '2em',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ddd',
        fontFamily: 'sans-serif',
    },
};

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentWillMount = () => {
        FirebaseService.getAllLeituras(leituras => {this.setState({data: leituras})}, 20);
    };

    render() {
        return (
            <div style={styles.container}>
                <Table data={this.state.data}/>
            </div>
        );
    }
}
