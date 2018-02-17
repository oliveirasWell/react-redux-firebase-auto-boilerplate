import React from 'react';
import {nodes} from "../../utils/dataBaseNodes";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError} from "../../actions/actionCreator";
import {connect} from "react-redux";

const styles = {
    input: {
        marginBottom: '5px',
        width: '100%',
        display: 'block'
    },
    inputSubmit: {
        width: '15em',
        fontSize: '0.7em',
        margin: '0 5px',
    },
    divFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
    }
};

class FirebaseNodeElement extends React.Component {

    state = {
        id: null,
        node: null,
        obj: null,
    };
    updateNode = (node, id) => {
        if ((node === null || node === undefined || id === null || id === undefined) && !!this.props.isEdit) {
            this.props.history.push('/edit/');
            return;
        }

        if ((node === null || node === undefined) && !this.props.isEdit) {
            this.props.history.push('/new/');
            return;
        }

        this.setState({node, id});

        // this.props.history.replace(links[node.key]);

        FirebaseService.getUniqueDataBy(node, dataIn => this.setState({obj: dataIn}));
    };
    submit = (event) => {
        event.preventDefault();

        const objToSubmit = this.state.node.keys.reduce((map, key) => {
            map[key] = this[key].value;
            return map;
        }, {});

        FirebaseService.writeData(this.state.id, objToSubmit, this.state.node)
            .then(sucess => {
                if (sucess != null || sucess !== undefined) {
                    this.props.addMessage(sucess);
                }
            })
            .catch(error => {
                if (error != null || error !== undefined) {
                    this.props.addMessage(error);
                }
            });
    };

    componentWillMount() {
        this.updateNode(nodes[this.props.match.params.node], this.props.match.params.id);
    };

    render() {

        const keys = this.state.node.keys;
        const obj = this.state.obj;

        return <div style={{paddingLeft: '3em', paddingRight: '3em'}}>
            <form onSubmit={this.submit}>

                <h1>{this.state.node.name}</h1>
                {
                    keys.map(
                        (key, index) =>
                            <React.Fragment key={index}>
                                <br/>
                                <label>{key}</label>
                                <br/>
                                <input className={'circularInput'} style={styles.input} id={key} type="text" defaultValue={obj[key]}
                                       ref={input => this[key] = input}/>
                            </React.Fragment>
                    )
                }

                <br/>
                <br/>
                <div style={{...styles.input, ...styles.divFlex}}>
                    <input style={{...styles.input, ...styles.inputSubmit}} type="submit" value="save" className={'circularButton'}/>
                    <button style={{...styles.input, ...styles.inputSubmit}} type="submit" value="save" className={'circularButton'}>
                        back
                    </button>
                </div>
            </form>
        </div>;

    };
}


const mapDispatchToProps = dispatch => {
    return {
        addMessage: message => dispatch(addGlobalError(message)),
    };
};

export default connect(null, mapDispatchToProps)(FirebaseNodeElement);