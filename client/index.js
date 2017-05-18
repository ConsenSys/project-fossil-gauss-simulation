import React, { Component } from 'react'
import { render } from 'react-dom'
import Main from './components/Main'
import { Provider, connect } from 'react-redux'
import store from './store'

class App extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

render(
  <App />,
  document.getElementById('app')
)
