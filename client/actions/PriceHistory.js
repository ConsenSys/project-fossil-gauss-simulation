import Socket from 'simple-websocket'

export default class PriceHistory {
  constructor() {
    this.socket
  }

  dataChannel() {
    return (dispatch) => {
      console.log('hit middleware')
      this.socket = new Socket('ws://localhost:3003')
      this.socket.on('data', (data) => {
        console.log('got data from server!', data)
      })
    }
  }

  dataSubscribe(name, expiration_date) {
    return (dispatch) => {

    }
  }
}
