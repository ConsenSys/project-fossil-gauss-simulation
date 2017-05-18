import React, { Component } from 'react'
import {
  Row,
} from 'react-bootstrap'
import Header from './Header'

export default class Main extends Component {
  constructor() {
    super()
    console.log('main')
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
