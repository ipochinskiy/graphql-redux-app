import React, { Component } from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { queryReducer } from "./app/reducers/reducers.js";
import thunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

class Main extends Component {
    render() {
        return (
            <div>
                <p>hello react!</p>
            </div>
        )
    }
};

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(queryReducer)}>
        <Main />
    </Provider>,
    document.getElementById("example")
);
