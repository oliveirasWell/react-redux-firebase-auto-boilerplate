import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {createProvider as Provider} from "react-redux";
import configureStore from "../../utils/configureStore";
import {PersistGate} from 'redux-persist/integration/react'


const {store, persistor} = configureStore();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <App/>
                </Router>
            </PersistGate>
        </Provider>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
