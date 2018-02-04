import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
    <Router>
        <Route path={'/'} component={App}/>
    </Router>
    , document.getElementById('root')
);

registerServiceWorker();