import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'

import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

import reducers from './reducers/index'
const createStoreWithMiddleware = applyMiddleware(promise())(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root')
)

registerServiceWorker()
