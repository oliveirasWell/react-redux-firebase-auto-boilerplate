import React from "react";
import {Line} from "../Line/Line";
import Logout from "../Logout/Logout.jsx";

export default class Table extends React.Component {

    static url = () => '/table';
    
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    componentWillReceiveProps = nextProps => {
        this.setState({
            data: nextProps.data
        });
    };

    extractTableInfo = () => {
        const firstItem = this.state.data[0];
        const keys = firstItem !== undefined ? Object.keys(firstItem) : [];

        const dataList = this.state.data
            .map((leitura, index) =>
                <Line dados={leitura} index={index} key={index}/>
            );

        const header = (<tr>{keys.map((key, index) => <th key={index}> {key} </th>)}</tr>);

        return {dataList, header};
    };

    render() {

        const {dataList, header} = this.extractTableInfo();

        return (
            <div>
                <Logout/>
                <table>
                    <thead>
                    {header}
                    </thead>
                    <tbody>
                    {dataList}
                    </tbody>
                </table>
            </div>
        );
    }
}