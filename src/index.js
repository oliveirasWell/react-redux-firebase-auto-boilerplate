import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';
import {createStore, combineReducers} from "redux";
import {userReducer} from "./reducers/userReducer";
import {msgReducer} from "./reducers/msgReducer";
import {Provider} from 'react-redux';

const reducers = combineReducers({userAuth: userReducer, msg: msgReducer});

export const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path={'/'} render={() => <App/>}/>
        </Router>
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();