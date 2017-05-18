import React, { Component } from 'react'
import { render } from 'react-dom'
import Main from './components/Main'
class App extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('app')
)
