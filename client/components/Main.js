import React, { Component } from 'react'
import {
  Row,
} from 'react-bootstrap'
import Header from './Header'
import { connect } from 'react-redux'

class MainComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{
        backgroundColor: "hsl(220, 10%, 40%)",
      }}>
        <Header />
      </div>
    )
  }
}

const mapStoreToProps = (store, props) => {
  return {
    priceHistory: store.priceHistory
  }
}

const Main = connect(mapStoreToProps)(MainComponent)

export default Main
