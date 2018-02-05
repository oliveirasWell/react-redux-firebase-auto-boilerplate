import React from 'react';
import Login from "../Login/Login";

class NavigationWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.Component = props.component;
        this.state = {userAuth:null};
    }


    componentDidMount = () => {
        this.props.store.subscribe(() => this.setState({userAuth: this.props.store.getState().userAuth}));
    };

    render() {
        return <div>
            {this.state.userAuth != null
                ? <this.Component {...this.props} />
                : <Login {...this.props}/>
            }
        </div>
    }
}

export default NavigationWrapper;
