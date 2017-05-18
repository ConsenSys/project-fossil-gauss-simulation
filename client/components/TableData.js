import React, { Component } from 'react'
import{
  Table
} from 'react-bootstrap'

export default class TableData extends Component {
  constructor(props) {
    super(props)
  }

  tableBody() {

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

        </tbody>
      </Table>
    )
  }
}
