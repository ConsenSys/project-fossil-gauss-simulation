import Socket from 'simple-websocket'
import store from '../store'
import Promise from 'bluebird'

export default class PriceHistory {
  constructor() {
    this.socket
  }

  dataChannel() {
    return (dispatch) => {
      console.log('hit middleware')
      this.socket = new Socket('ws://localhost:3003')
      this.socket.on('data', (data) => {
        console.log('got data from server!', data.toString())
      })
    }
  }

  commoditySuscribe(product, dates) {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        return dates.map((date) => {
          console.log('date', date)
          const payload = {
            name: product,
            date: date.month
          }
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
