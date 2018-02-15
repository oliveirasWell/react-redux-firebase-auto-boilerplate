import FirebaseGenericTable from "../FirebaseGenericTable/FirebaseGenericTable";
import {TableLine} from "../TableLine/TableLine";
import Fade from "../Fade/Fade";
import FontAwesome from 'react-fontawesome';
import PropTypes from "prop-types";
import React from "react";

class DataTable extends FirebaseGenericTable {

    state = {
        tittle: '',
        dataList: this.props.dataList,
        in: false,
    };

    componentWillReceiveProps = nextProps => {
        this.setState({
            dataList: nextProps.dataList
        });
    };

    componentWillMount = () => {
        this.setState({tittle: this.props.tittle});
    };


    componentDidMount = () => {
        this.setState({in: true})
    };

    extractTableInfo = () => {
        if (this.state.dataList == null || this.state.dataList === undefined) {
            return {dataList: null, header: null}
        }

        const firstItem = this.state.dataList[0];
        const keys = firstItem !== undefined ? Object.keys(firstItem) : [];

        const dadosKeys = {};
        keys.forEach((key) => {
            if (!(firstItem[key] instanceof Array || firstItem[key] instanceof Object)) {
                dadosKeys[key] = key;
            }
        });

        const keysToPrint = Object.keys(dadosKeys);

        const dataList = this.state.dataList
            .map((leitura, index) =>
                <TableLine dados={leitura} index={index} key={index} isHeader={false} keys={keysToPrint}/>
            );

        const header = <TableLine keys={keysToPrint} dados={dadosKeys} isHeader={true}
                                  style={{textTransform: 'capitalize'}}/>;

        return {dataList, header};
    };

    render() {
        if (!!this.state.dataList && this.state.dataList.length === 0) {
            return (
                <Fade in={true}>
                    <React.Fragment>
                        <h1 style={{margin: 0}}>{this.state.tittle}</h1>
                        <div style={{margin: '0 auto', textAlign: 'center'}}><FontAwesome name='bolt' spin size="5x"/>
                        </div>
                    </React.Fragment>
                </Fade>

            );
        }

        const {dataList, header} = this.extractTableInfo();

        const table = (
            <table style={{margin: '0 auto'}}>
                <thead>
                {header}
                </thead>
                <tbody>
                {dataList}
                </tbody>
            </table>
        );

        return (
            <Fade in={this.state.in}>
                <div>
                    <h1 style={{margin: 0}}>{this.state.tittle}</h1>
                    <Fade in={!!dataList && dataList.length > 0}>
                        {table}
                    </Fade>
                </div>
            </Fade>
        );
    }

}

DataTable.contextTypes = {
    store: PropTypes.object.isRequired,
};

export default DataTable;
