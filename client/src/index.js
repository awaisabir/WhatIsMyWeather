import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'

import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import reducers from './reducers'
const createStoreWithMiddleware = applyMiddleware(createLogger(), promise())(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root')
)

registerServiceWorker()
