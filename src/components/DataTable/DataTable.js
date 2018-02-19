import {TableLine} from "../TableLine/TableLine";
import Fade from "../Fade/Fade";
import FontAwesome from 'react-fontawesome';
import React from "react";
import {nodes} from "../../utils/custom/nodes";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError} from "../../actions/actionCreator";
import {connect} from "react-redux";

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

        this.props.history.replace(node.pathToMainLink);

        FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 50, c => node.flat(c), node.orderByChild);
    };

    componentWillMount() {
        this.setState({tittle: this.props.tittle});
        this.updateNode(nodes[this.props.match.params.node]);
    };

    extractTableInfo = () => {
        if (this.state.dataList == null || this.state.dataList === undefined) {
            return {dataList: null, header: null}
        }

        const keys = this.state.node.keys;
        const firstItem = this.state.dataList[0];
        const keyToHeader = keys.filter(k => !(firstItem !== undefined && (firstItem[k.key] instanceof Array || firstItem[k.key] instanceof Object)))
            .reduce((map, obj) => {
                map[obj.key] = obj.key;
                return map;
            }, {});

        const header = <TableLine keys={keys} data={keyToHeader} isHeader={true} style={styles.header}/>;
        const dataList = this.state.dataList.map((leitura, index) => {
            return <TableLine data={leitura}
                              index={index}
                              key={index}
                              isHeader={false}
                              keys={keys}
                              removeMethod={(id) => this.removeNode(id)}
                              editMethod={(id) => this.editNode(id)}
            />
        });

        return {dataList, header};
    };

    redirectToNew = () => {
        this.props.history.push(this.state.node.pathToNew);
    };

    removeNode = (id) => {
        FirebaseService.remove(id, this.state.node, (message) => this.props.addMessage(message));
    };

    editNode = (id) => {
        this.props.history.push(`${this.state.node.pathToEdit}/${id}`);
    };

    componentDidMount() {
        this.setState({in: true})
    };

    render() {
        const TableWrapper = (props) => {
            return <Fade in={this.state.in}>
                <div className={'.center'}>
                    <nav className={'center'} style={styles.nav}>
                        {
                            Object.values(nodes).map((node, key) => {
                                let style = node.key === this.state.activeTab ? {fontWeight: 500} : {fontWeight: 200};
                                return <a key={key} onClick={() => this.updateNode(node)} style={{...styles.link, ...style}}>{node.name}</a>
                            })
                        }

                        {
                            this.state.node.canAddNew && <button onClick={this.redirectToNew} style={{float: 'right'}} className={'circularButton'}>Add new {this.state.node.name}</button>
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

            fade = (!!dataList && dataList.length > 0) || (this.state.dataList.length === 0);
            table = (
                <table style={{margin: '0 auto'}}>
                    <thead>
                    {header}
                    </thead>
                    <tbody>
                    {
                        this.state.dataList.length !== 0
                            ? dataList
                            : <tr>
                                <td align="center" colSpan={this.state.node.keys.length + 1}> nothing here</td>
                            </tr>
                    }
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

const mapDispatchToProps = dispatch => {
    return {
        addMessage: message => dispatch(addGlobalError(message)),
    };
};

export default connect(null, mapDispatchToProps)(DataTable);