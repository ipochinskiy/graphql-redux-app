import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { queryReducer } from './app/reducers/reducer.js';
import { QueryContainer } from './app/components/Query.js';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

class Main extends Component {
    render() {
        return (
            <div>
                <QueryContainer />
            </div>
        )
    }
};

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(queryReducer)}>
        <Main />
    </Provider>,
    document.getElementById('example')
);
