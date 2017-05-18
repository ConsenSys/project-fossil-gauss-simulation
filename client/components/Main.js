import React, { Component } from 'react'
import {
  Row,
  Col,
} from 'react-bootstrap'
import Header from './Header'
import { connect } from 'react-redux'
import { PriceHistory } from '../actions/index'
import TableData from './TableData'

class MainComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(PriceHistory.dataChannel())
  }

  render() {
    return (
      <div style={{
        // backgroundColor: "hsl(220, 10%, 40%)",
      }}>
        <Header />
        <Row>
          <Col sm={4}>
            <TableData />
          </Col>
        </Row>
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
