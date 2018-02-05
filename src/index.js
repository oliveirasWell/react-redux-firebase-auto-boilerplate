import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';
import {store} from "./reducers/userReducer";

ReactDOM.render(
    <Router>
        <Route path={'/'} render={() => <App store={store}/>}/>
    </Router>
    , document.getElementById('root')
);

registerServiceWorker();