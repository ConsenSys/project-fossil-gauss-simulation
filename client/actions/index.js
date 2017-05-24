import PriceHistory from './PriceHistory'
import store from '../store'
module.exports = {
  PriceHistory: new PriceHistory({
    store: store,
  })
}
