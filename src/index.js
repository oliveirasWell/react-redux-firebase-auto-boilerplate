import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';
import {Provider} from 'react-redux';
import {routes} from "./utils/custom/routes";
import configureStore from './utils/configureStore';
import {PersistGate} from 'redux-persist/integration/react'
import App from "./components/App/App";

const {store, persistor} = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Route path={routes.root} render={(props) => <App {...props}/>}/>
            </Router>
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();