import React from 'react';
import Login from "../Login/Login";

class NavigationWrapper extends React.Component {
    constructor(props){
        super(props);
        this.Component = props.component;
    }

    render() {
        return <div>
        {this.props.store.getState() != null
            ? <this.Component {...this.props} />
            : <Login {...this.props}/>
        }
    </div>}
}

export default NavigationWrapper;