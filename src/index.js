import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';

import {createStore, combineReducers} from "redux";
import {userReducer} from "./reducers/userReducer";
import {msgReducer} from "./reducers/msgReducer";

const reducers = combineReducers({userAuth:userReducer, msg:msgReducer});

export const store = createStore(reducers);

ReactDOM.render(
    <Router>
        <Route path={'/'} render={() => <App store={store}/>}/>
    </Router>
    , document.getElementById('root')
);

registerServiceWorker();