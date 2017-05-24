import Promise from 'bluebird'
import gaussian from 'gaussian'
import util from 'util'
import levelup from 'levelup'
import sublevel from 'level-sublevel'
import { sha256 } from 'ethereumjs-util'
import express from 'express'
import rp from 'request-promise'

export default class Simulation {
  constructor(params) {
    this.name = params.name
    this.symbol = params.symbol
    this.expiration_date = params.date
    this.db = params.db.sublevel(`${this.name}_${this.expiration_date}`)
    // this.db._parent.registerIndex('date', (key, value, emit) => {
    //   value = JSON.parse(value)
    //   if(value.date) emit(value.date)
    // })
    this.data = []
    this.market_price = 1
    this.market_price_variance = .1
    this.volume = 1000
    this.volume_variance = 400
    this.high
    this.low
    this.open
    this.close
    this.date
    this.setupWebsocket
    this.datum
    this.subscription = false
    this.simulationLoop()
  }
  /*
  /////////////////////////////////////////////////
  GAUSS SIMULATION
  /////////////////////////////////////////////////
  */
  simulationLoop() {
    return new Promise((resolve, reject) => {
      return Promise.delay(10000)
      .then(() => {
        this.date = new Date().getTime()
        return this.calculateVolume()
      }).then(() => {
        return this.calculateMarketParams()
      }).then(() => {
        // this.data.push({
        //   date: this.date,
        //   open: this.open,
        //   high: this.high,
        //   low: this.low,
        //   close: this.close,
        //   volume: this.volume
        // })
        this.datum = {
          date: this.date,
          open: this.open,
          high: this.high,
          low: this.low,
          close: this.close,
          volume: this.volume
        }
        // console.log(
        //   `
        //   ${this.name} | ${this.expiration_date}
        //   ${util.inspect(this.data)}
        //   `
        // )
        return this.appendData(this.datum)
      }).then(() => {
        return this.simulationLoop()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  calculateVolume() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.bellRandom(this.volume, this.volume_variance)
      }).then((volume) => {
        if (volume < 0) {
          return 0
        }
        return volume
      }).then((volume) => {
        this.volume = volume
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  calculateMarketParams() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
         return this.calcMarketPrice()
      }).then((price) => {
        this.market_price = price
      }).then(() => {
        return this.calcLow()
      }).then((price) => {
        this.low = price
        return this.calcHigh()
      }).then((price) => {
        this.high = price
        return this.calcOpen()
      }).then((price) => {
        this.open = price
        return this.calcClose()
      }).then((price) => {
        this.close = price
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  calcMarketPrice() {
    const market_price = this.bellRandom(this.market_price, this.market_price_variance)
    if (market_price <= 0) {
      return 0
    }
    return market_price
  }

  calcLow() {
    const low_price = this.lowerTail(this.market_price, this.market_price_variance)
    if (low_price <= 0) {
      return 0
    }
    return low_price
  }

  calcHigh() {
    const high_price = this.upperTail(this.market_price, this.market_price_variance)
    if (high_price <= 0) {
      return 0
    }
    return high_price
  }

  calcOpen() {
    if(!this.open) {
      const open_price = this.bellRandom(this.market_price, this.market_price_variance)
      if (open_price < 0) {
        return 0
      } else if (open_price < this.low) {
        return this.low
      } else if (open_price > this.high) {
        return this.high
      } else {
        return open_price
      }
    }
    return this.close
  }

  calcClose() {
    const close_price = this.bellRandom(this.market_price, this.market_price_variance)

    if (close_price < this.low) {
      return this.low
    } else if (close_price > this.high) {
      return this.high
    } else {
      return close_price
    }
  }

  /*
  /////////////////////////////////////////////////
  MATH UTILS
  /////////////////////////////////////////////////
  */
  lowerTail(mean, variance) {
    const distribution = gaussian(mean, variance)
    const sample = distribution.ppf(Math.random()*0.5)
    return sample
  }

  upperTail(mean, variance) {
    const distribution = gaussian(mean, variance)
    const sample = distribution.ppf(Math.random()*(1-.5)+.5)
    return sample
  }

  bellRandom(mean, variance) {
    const distribution = gaussian(mean, variance)
    const sample = distribution.ppf(Math.random())
    return sample
  }

  /*
  /////////////////////////////////////////////////
  LEVEL DB INTERFACE
  /////////////////////////////////////////////////
  */
  appendData(obj) {
    this.db.put(sha256(JSON.stringify(obj)), JSON.stringify(obj), (err) => {
      if(err) console.log('err', err)
    })
    if(this.subscription) {
      console.log('appending data obj:', obj)
      let payload = {
        data: obj,
        name: this.name,
        expiration_date: this.expiration_date
      }
      console.log('payload', payload)
      return rp({
        method: 'GET',
        uri: 'http://localhost:3004/update',
        body: payload,
        json: true
      }).then((res) => {
        console.log('hit server w/ response', res)
      })
    }
  }

  retrieveData() {
    let state = []
    this.db.createReadStream()
    .on('data', (data) => {
      state.push(JSON.parse(data.value))
    }).on('error', (err) => {
      console.log('Error in read stream:', err)
    }).on('close', () => {
      // console.log('read stream has been closed!')
    }).on('end', () => {
      // console.log('read stream has ended!')
      return state
    })

    return new Promise((resolve, reject) => {
      return Promise.delay(2000)
      .then(() => {
        resolve(state)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  subscribe() {
    this.subscription = true
  }

}
