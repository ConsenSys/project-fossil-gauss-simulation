import React, { Component } from 'react'
import{
  Table
} from 'react-bootstrap'
import { connect } from 'react-redux'

class TableDataComponent extends Component {
  constructor(props) {
    super(props)
  }

  tableBody() {
    // const { priceHistory: { initial_date } } = this.props
    // console.log('initial_date', initial_date)
    // let start_date = new Date(2017, 0, 1)
    // console.log('start_date', start_date)
    // for (let i = 0; i < 36; i++) {
    //   start_date = start_date.getMonth()
    //   con
    // }
    const { priceHistory: { dates } } = this.props
    console.log('dates', dates)
  }

  render() {
    return (
      <Table responsive striped bordered condensed hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {this.tableBody()}
        </tbody>
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
