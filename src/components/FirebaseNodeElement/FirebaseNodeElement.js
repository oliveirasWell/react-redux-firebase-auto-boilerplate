import React from 'react';
import {nodes} from "../../utils/dataBaseNodes";
import {FirebaseService} from "../../services/FirebaseService";
import {addGlobalError} from "../../actions/actionCreator";
import {connect} from "react-redux";
import {links} from "../../utils/routes";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import PropTypes from "prop-types";
import FontAwesome from 'react-fontawesome';

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

    updateNode = (node, id) => {
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
            map[key] = '';
            return map;
        }, {});

        this.setState({obj: objToSubmit});
    };
    submit = (event) => {
        event.preventDefault();

        const objToSubmit = this.state.node.keys.reduce((map, key) => {
            map[key] = this[key].value;
            return map;
        }, {});

        if (!this.props.isEdit) {
            let newId = FirebaseService.pushData(this.state.node, objToSubmit);
            this.props.addMessage(`${this.state.node.name} ${newId} has been successful created.`);
            this.redirectToParentList();
            return;
        }

        FirebaseService.writeData(this.state.id, objToSubmit, this.state.node)
            .then(() => {
                this.props.addMessage(`${this.state.node.name} ${this.state.id} has been successful updated.`);
                this.redirectToParentList();
            })
            .catch(error => {
                if (error != null || error !== undefined) {
                    this.props.addMessage(error.message);
                }
            });
    };
    redirectToParentList = () => {
        this.props.history.push(links[this.state.node.key]);
    };

    componentWillMount() {
        this.updateNode(nodes[this.props.match.params.node], this.props.match.params.id);
    };

    render() {

        //FIXME why? why? why?
        if (this.state.node == null) {
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

                <h1>{this.state.node.name}</h1>
                {
                    this.state.node.keys.map(
                        (key, index) =>
                            <React.Fragment key={index}>
                                <br/>
                                <label>{key}</label>
                                <br/>
                                <input className={'circularInput'} style={styles.input} id={key} type="text" defaultValue={this.state.obj[key]}
                                       onChange={(c) => c}
                                       ref={input => this[key] = input}/>
                            </React.Fragment>
                    )
                }
                <br/>
                <br/>
                <div style={{...styles.input, ...styles.divFlex}}>
                    <input style={{...styles.input, ...styles.inputSubmit}} type="submit" value="save" className={'circularButton'}/>
                    <button style={{...styles.input, ...styles.inputSubmit}} className={'circularButton'} onClick={() => this.redirectToParentList()}>
                        back
                    </button>
                </div>
            </form>
        </div>;

    }
    ;
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