import FirebaseGenericTable from "../FirebaseGenericTable/FirebaseGenericTable";
import {TableLine} from "../TableLine/TableLine";
import Fade from "../Fade/Fade";
import FontAwesome from 'react-fontawesome';
import PropTypes from "prop-types";
import React from "react";
import {nodes} from "../../utils/dataBaseNodes";
import {FirebaseService} from "../../services/FirebaseService";

class DataTable extends FirebaseGenericTable {

    state = {
        tittle: '',
        dataList: this.props.dataList,
        activeTab: null,
        node: null,
        in: false,
    };

    componentWillReceiveProps = nextProps => {
        this.setState({
            dataList: nextProps.dataList
        });
    };

    componentWillMount = () => {
        this.setState({tittle: this.props.tittle});
        this.redirectAndRender(nodes[this.props.match.params.node]);
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

    redirectAndRender(node) {
        this.setState(() => {
            return {activeTab: node.key, node: node}
        });

        FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 20, c => node.flat(c), null);
    }

    render() {

        const nodesList = Object.values(nodes);

        const nav = <nav className={'center'}>
            {
                nodesList.map((node, key) => {
                    const styleOfTab = node.key === this.state.activeTab ? {fontWeight: 900} : {fontWeight: 100};
                    return node.path && <a key={key} onClick={() => this.redirectAndRender(node)}
                                           style={{...styleOfTab, marginRight: '5px'}}>{node.name}</a>
                })
            }
        </nav>;

        if (this.state.dataList === null || this.state.dataList === undefined || this.state.dataList.length === 0) {
            return (
                <Fade in={true}>
                    <React.Fragment>
                        {nav}
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
                <div style={{margin: '0 auto'}}>
                    {nav}
                    <hr/>
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
