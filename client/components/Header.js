import React, { Component } from 'react'
import {
  Tabs,
  Tab,
} from 'react-bootstrap'


export default class Header extends Component {
  constructor() {
    super()
    console.log('header ')
  }

  handleSelect() {

  }



  render() {
    return (
      <Tabs activeKey={2} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
        <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
        <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
      </Tabs>
    )
  }
}
