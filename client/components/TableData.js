import React, { Component } from 'react'
import{
  Table
} from 'react-bootstrap'
import { connect } from 'react-redux'

class TableDataComponent extends Component {
  constructor(props) {
    super(props)
  }

  tableData() {
    let jsx = []
    const { priceHistory: { dates, productView, price_history } } = this.props
    console.log('price_history', price_history)
    return dates.map((date, i) => {
      return (
        <tr key={i}>
          <th>{date.month}</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      )
    })
  }

  tableBody() {
    console.log('hit table body')
    return (
      <tbody>
        {this.tableData()}
      </tbody>
    )
  }

  render() {
    return (
      <Table responsive striped bordered condensed hover style={{
        padding: 20,
      }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
          </tr>
        </thead>
        {this.tableBody()}
      </Table>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    priceHistory: store.priceHistory
  }
}

const TableData = connect(mapStoreToProps)(TableDataComponent)

export default TableData
