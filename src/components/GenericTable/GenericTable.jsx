import React from "react";
import {Line} from "../Line/Line";
import Logout from "../Logout/Logout";

export default class GenericTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tittle:'',
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
                <Line dados={leitura} index={index} key={index}/>
            );

        const header = (<tr>{keys.map((key, index) => <th key={index}> {key} </th>)}</tr>);

        return {dataList, header};
    };

    render() {

        const {dataList, header} = this.extractTableInfo();

        console.log(!!this.props.store && !!this.props.store.getState() && this.props.store.getState().displayName);

        return (
            <div>
                <h1>{this.state.tittle}</h1>
                <span>{!!this.props.store && !!this.props.store.getState() && this.props.store.getState().displayName}</span>
                <Logout store={this.props.store}/>
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