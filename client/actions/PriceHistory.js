import Socket from 'simple-websocket'
import Promise from 'bluebird'


export default class PriceHistory {
  constructor(params) {
    this.store = params.store
    this.socket
  }

  dataChannel() {
    return (dispatch) => {
      console.log('hit middleware')
      this.socket = new Socket('ws://localhost:3003')
      this.socket.on('data', (data) => {
        let json_data = JSON.parse(data)
        console.log('name', json_data.name, json_data.data, json_data.expiration_date)
        dispatch({type: 'UPDATE_PRICE_HISTORY',
          name: json_data.name, data: json_data.data,
          expiration_date: json_data.expiration_date
        })
      })
    }
  }

  commoditySuscribe(product, dates) {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        return this.checkObjectTree(product, dates)
        .then(() => {
            return dates
        }).map((date) => {
          console.log('date', date)
          const payload = {
            name: product,
            date: date.month
          }
          console.log('this.props', this.props)
          this.socket.write(JSON.stringify(payload))
        })
      })

      console.log('made it here')
      const payload = {
        name: product,
        date: '2017-01-01'
      }
      this.socket.write(JSON.stringify(payload))
    }
  }

  checkObjectTree(product, dates) {
    const store = this.store.getState()
    return new Promise((resolve, reject) => {
      return dates.map((date) => {
        console.log('product', product)
          console.log('store.product', store.product)
        if(!store['timeSeries']['price_history_data'][product][date]) {
          dispatch({type: 'ADD_PRODUDCT_DATA', product: product, expiration_date: date})
        }
      })
    })
  }

  dataSubscribe(name, expiration_date) {
    return (dispatch) => {
      let payload = {
        name: name,
        date: expiration_date
      }
      this.socket.write(JSON.stringify(payload))
    }
  }
}
