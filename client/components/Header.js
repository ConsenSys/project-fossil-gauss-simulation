import React, { Component } from 'react'
import {
  Tabs,
  Tab,
} from 'react-bootstrap'
import { connect } from 'react-redux'

class HeaderComponent extends Component {
  constructor() {
    super()
    console.log('header ')
  }

  handleSelect() {

  }

  products() {
    const { priceHistory: { products } } = this.props
    console.log('this.props', this.props)
    console.log('products', products)
    return products.map((product, i) => {
      console.log('product', product)
      return <Tab key={i} eventKey={1} title={product.toString()}>{product}</Tab>
    })
    // return (
    //   <Tab eventKey={1} title={'ex'}>ex</Tab>
    // )
  }

  render() {
    return (
      <Tabs activeKey={2} onSelect={this.handleSelect} id="controlled-tab-example">
        {this.products()}
      </Tabs>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    priceHistory: store.priceHistory
  }
}

const Header = connect(mapStoreToProps)(HeaderComponent)

export default Header
