import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers.js';
import { createLogger } from 'redux-logger';

import thunk from 'redux-thunk';

let finalCreateStore = compose(
    applyMiddleware(createLogger(),thunk)
)(createStore);

export default function configureStore(initialState = {}) {
    return finalCreateStore(reducer,
     //   initialState
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}