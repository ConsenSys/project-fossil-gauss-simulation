import React, { Component } from 'react'
import {
  Tabs,
  Tab,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { PriceHistory } from '../actions/index'
import Promise from 'bluebird'

class HeaderComponent extends Component {
  constructor() {
    super()
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e) {
    const { dispatch } = this.props
    const { priceHistory: { dates } } = this.props
    dispatch(PriceHistory.commoditySuscribe(e, dates))
    // return new Promise((resolve, reject) => {
    //   return new Promise.delay(0).then(() => {
    //     return dispatch({type: 'CHANGE_PRODUCT_VIEW', value: e})
    //   }).then(() => {
    //     return  dispatch(PriceHistory.commoditySuscribe())
    //   }).then(() => {
    //     resolve(true)
    //   }).catch((err) => {
    //     reject(err)
    //   })
    // })
  }

  products() {
    const { priceHistory: { products } } = this.props
    return products.map((product, i) => {
      return <Tab key={i} eventKey={product} title={product.toString()}></Tab>
    })
  }

  render() {
    console.log('this.props(render)', this.props)
    return (
      <Tabs activeKey={2} onSelect={this.handleSelect} id="controlled-tab-example">
        {this.products()}
      </Tabs>
    )
  }
}

const mapStoreToProps = (store, props) => {
  return {
    priceHistory: store.priceHistory
  }
}

const Header = connect(mapStoreToProps)(HeaderComponent)

export default Header
