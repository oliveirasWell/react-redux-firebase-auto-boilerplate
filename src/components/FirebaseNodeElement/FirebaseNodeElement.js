import React from 'react';
import {nodes} from "../../utils/custom/nodes";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError} from "../../actions/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import PropTypes from "prop-types";
import FontAwesome from 'react-fontawesome';
import {dateTimeOf} from "../../utils/dateUtils";

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
    },
    divFontAwesome: {
        margin: '0 auto',
        textAlign: 'center'
    },
};

class FirebaseNodeElement extends React.Component {

    state = {
        id: null,
        node: null,
        obj: null,
    };

    componentWillMount() {

        const node = nodes[this.props.match.params.node];
        const id = this.props.match.params.id;

        if ((node === null || node === undefined || id === null || id === undefined) && this.props.isEdit) {
            this.props.history.push('/edit/');
            return;
        }

        if ((node === null || node === undefined || !node.canAddNew) && !this.props.isEdit) {
            this.props.history.push('/new/');
            return;
        }

        this.setState({node, id});

        if (this.props.isEdit) {
            FirebaseService.getUniqueDataBy(node, id, dataIn => this.setState({obj: dataIn}));
            return;
        }

        const objToSubmit = node.keys.reduce((map, key) => {
            map[key.key] = '';
            return map;
        }, {});

        this.setState({obj: objToSubmit});
    };

    redirectToParentList = (node) => {
        this.props.history.push(node.pathToMainLink);
    };

    submit = (event) => {
        event.preventDefault();

        let node = this.state.node === undefined ? nodes[this.props.match.params.node] : this.state.node;

        const objToSubmit = node.keys.filter((c) => !this.isArray(c)).reduce((map, key) => {

            if (key.type === 'checkbox') {
                map[key.key] = this[key.key].checked;
            } else {
                map[key.key] = this[key.key].value;
            }

            return map;
        }, {});

        node.keys.filter(this.isArray).forEach(keyOfArray => {
            objToSubmit[keyOfArray.key] = this.state.obj[keyOfArray.key] !== undefined ? this.state.obj[keyOfArray.key].slice(0) : null;
        });

        if (!this.props.isEdit) {
            let newId = FirebaseService.pushData(node, objToSubmit);
            this.props.addMessage(`${node.name} ${newId} has been successful created.`);
            this.redirectToParentList(node);
            return;
        }

        FirebaseService.writeData(this.state.id, objToSubmit, node)
            .then(() => {
                this.props.addMessage(`${this.state.node.name} ${this.state.id} has been successful updated.`);
                this.redirectToParentList(node);
            })
            .catch(error => {
                if (error != null || error !== undefined) {
                    this.props.addMessage(error.message);
                }
            });
    };

    isArray = key => key.type === 'array';

    render() {

        const {node} = this.state;

        //FIXME why? why? why?
        if (node == null) {
            return null;
        }

        //Why this? Because firebase sucks.
        if (!this.state.obj || this.state.obj === undefined) {
            return <div style={styles.divFontAwesome}>
                &nbsp; <FontAwesome name='bolt' spin/>
            </div>
        }

        return <div>
            <form onSubmit={this.submit}>

                <h1>{node.name}</h1>
                {
                    node.keys.filter((c) => !this.isArray(c)).map(
                        (key, index) =>
                            <React.Fragment key={index}>
                                <br/>
                                <label>{key.name}</label>
                                <br/>
                                <input style={styles.input} id={key.key}
                                       type={key.type}
                                       required={key.required && key.type !== 'checkbox'}
                                       defaultValue={key.type !== 'epoch' ? this.state.obj[key.key] : dateTimeOf(this.state.obj[key.key])}
                                       defaultChecked={key.type !== 'checkbox' ? null : this.state.obj[key.key]}
                                       onChange={(c) => c}
                                       ref={input => this[key.key] = input}/>
                            </React.Fragment>
                    )
                }
                <br/>
                <br/>
                <br/>
                {
                    node.keys.filter(this.isArray).map(
                        (key, index) =>
                            <React.Fragment key={index}>
                                <br/>
                                <label>{key.name}</label>
                                <hr/>
                                <ul>
                                    {

                                        this.state.obj[key.key] === undefined
                                            ? <li>
                                                <span>nothing here</span>
                                            </li>
                                            :
                                            (this.state.obj[key.key]).map(
                                                (arrayItem, index) =>
                                                    <li>
                                                        {key.showKeyOfArrayElements && <span> {index} </span>}
                                                        <span>{arrayItem}</span>
                                                    </li>
                                            )
                                    }
                                </ul>
                            </React.Fragment>
                    )
                }
                <div style={{...styles.input, ...styles.divFlex}}>
                    <input style={{...styles.input, ...styles.inputSubmit}} type="submit" value="save" className={'circularButton'}/>
                    <button style={{...styles.input, ...styles.inputSubmit}} className={'circularButton'} onClick={() => this.redirectToParentList(node)}>
                        back
                    </button>
                </div>
            </form>
        </div>;
    };
}

FirebaseNodeElement.propTypes = {
    isEdit: PropTypes.bool.isRequired
};

FirebaseNodeElement.defaultProps = {
    isEdit: true
};

const mapDispatchToProps = dispatch => {
    return {
        addMessage: message => dispatch(addGlobalError(message)),
    };
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(FirebaseNodeElement);