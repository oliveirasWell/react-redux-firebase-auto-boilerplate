import {TableLine} from "../TableLine/TableLine";
import Fade from "../Fade/Fade";
import FontAwesome from 'react-fontawesome';
import React from "react";
import {nodes} from "../../utils/dataBaseNodes";
import {FirebaseService} from "../../services/FirebaseService";
import {links} from "../../utils/routes";

const styles = {
    header: {
        textTransform: 'capitalize'
    },
    link: {
        marginRight: '5px',
        textTransform: 'capitalize'
    },
    divFontAwesome: {
        margin: '0 auto',
        textAlign: 'center'
    },
    nav: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: '65px',
        backgroundColor: '#FFF',
    }
};


class DataTable extends React.Component {

    state = {
        tittle: '',
        dataList: this.props.dataList,
        activeTab: null,
        node: null,
        in: false,
    };

    extractTableInfo = () => {
        if (this.state.dataList == null || this.state.dataList === undefined) {
            return {dataList: null, header: null}
        }

        const keys = this.state.node.keys;
        const firstItem = this.state.dataList[0];
        const dadosKeys = keys.filter(k => !(firstItem[k] instanceof Array || firstItem[k] instanceof Object))
            .reduce((map, obj) => {
                map[obj] = obj;
                return map;
            }, {});

        const header = <TableLine keys={keys} dados={dadosKeys} isHeader={true} style={styles.header}/>;
        const dataList = this.state.dataList
            .map((leitura, index) => <TableLine dados={leitura} index={index} key={index} isHeader={false} keys={keys}/>);

        return {dataList, header};
    };
    updateNode = (node) => {

        if (node === null || node === undefined) {
            this.props.history.push('/data/');
            return;
        }

        this.setState(() => {
            return {
                activeTab: node.key,
                node: node,
            }
        });

        this.props.history.replace(links[node.key]);

        FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 20, c => node.flat(c), null);
    };

    componentWillMount() {
        this.setState({tittle: this.props.tittle});
        this.updateNode(nodes[this.props.match.params.node]);
    };

    componentDidMount() {
        this.setState({in: true})
    };

    render() {
        const TableWrapper = (props) => {
            return <Fade in={this.state.in}>
                <div style={{margin: '0 auto'}}>
                    <nav className={'center'} style={styles.nav}>
                        {
                            Object.values(nodes).map((node, key) => {
                                let style = node.key === this.state.activeTab ? {fontWeight: 500} : {fontWeight: 200};
                                return node.path && <a key={key} onClick={() => this.updateNode(node)}
                                                       style={{...styles.link, ...style}}>{node.name}</a>
                            })
                        }
                    </nav>
                </div>
                <Fade in={props.fade}>
                    {props.children}
                </Fade>
            </Fade>
        };


        let table;
        let fade = true;

        if (this.state.dataList === null || this.state.dataList === undefined) {
            table = (
                <div style={styles.divFontAwesome}>
                    <FontAwesome name='bolt' spin size="5x"/>
                </div>
            );
        } else {
            const {dataList, header} = this.extractTableInfo();

            fade = !!dataList && dataList.length > 0;
            table = (
                <table style={{margin: '0 auto'}}>
                    <thead>
                    {header}
                    </thead>
                    <tbody>
                    {dataList}
                    </tbody>
                </table>
            );
        }

        return (
            <TableWrapper fade={fade}>
                {table}
            </TableWrapper>
        );
    }

}

export default DataTable;
