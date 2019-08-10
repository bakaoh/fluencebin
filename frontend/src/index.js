import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'
import reducer, { initialState } from './reducer'

const store = createStore(reducer, initialState)

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'))
