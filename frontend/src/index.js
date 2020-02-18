import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { auth } from './auth'

const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
)

auth.load_jwts()
auth.check_token_fragment()

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
