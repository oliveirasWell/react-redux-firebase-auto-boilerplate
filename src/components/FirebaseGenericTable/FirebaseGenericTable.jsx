import React from "react";
import {TableLine} from "../TableLine/TableLine";

export default class FirebaseGenericTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tittle: '',
            dataList: this.props.dataList,
        };
    }

    componentWillReceiveProps = nextProps => {
        this.setState({
            dataList: nextProps.dataList
        });
    };

    extractTableInfo = () => {
        if (this.state.dataList == null || this.state.dataList === undefined) {
            return {dataList: null, header: null}
        }

        const firstItem = this.state.dataList[0];
        const keys = firstItem !== undefined ? Object.keys(firstItem) : [];

        const dataList = this.state.dataList
            .map((leitura, index) =>
                <TableLine dados={leitura} index={index} key={index}/>
            );

        const header = (<tr>{keys.map((key, index) => <th key={index}> {key} </th>)}</tr>);

        return {dataList, header};
    };

    render() {
        const {dataList, header} = this.extractTableInfo();
        return (
            <div>
                <h1>{this.state.tittle}</h1>
                <table style={{margin: '0 auto'}}>
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
