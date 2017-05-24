import express from 'express'
import Server from 'simple-websocket/server'
import { Products, Dates } from './products'
import Promise from 'bluebird'
import Simulation from './Simulation'
import sublevel from 'level-sublevel'
import levelup from 'levelup'
import bodyParser from 'body-parser'
/*
///////////////////////////////////////////////////
RESTFUL SERVER
//////////////////////////////////////////////////
*/
const app = express()
app.use(bodyParser.json())

/**
 * writes updated state to socket
 */
app.get('/update', (req, res) => {
  const data = JSON.stringify(req.body)
  console.log('updating to current state', data)
  socket.write(data)
  res.send(data)
})

app.listen(3004, () => {
  console.log('#### RESTFUL INTERFACE LISTENING ON PORT 3004')
})

/*
///////////////////////////////////////////////////
WEBSOCKET SERVER
//////////////////////////////////////////////////
*/
const websocket = new Server({ port: 3003 })

let socket
websocket.on('connection', (_socket) => {
  console.log('#### WEBSOCKET CONNECTED ON PORT 3003')
  startSimulations(Products, Dates)
  socket = _socket
  _socket.on('data', (data) => {
    let temp = JSON.parse(data)
    console.log("recieved message from client w/ data", data.toString())
    let date = temp.expiration_date.split('T')[0]
    getData(temp.name, date)
  })
})

/*
///////////////////////////////////////////////////
UTIL METHODS
//////////////////////////////////////////////////
*/

export const db = sublevel(levelup('./gauss/price_history'))
let simulations = {}

/**
 * instantiates a simulation for each product varaition
 * @param  {object} products [description]
 * @param  {object} dates [description]
 */
export function startSimulations(products, dates) {
  return products.forEach((product) => {
    console.log('product.name', product.name)
    return simulations[product.name] = expirationDates(product, dates)
  })
}

export function expirationDates(product, expiration_dates) {
  let temp_obj = {}
  Promise.delay(0)
  .then(() => {
    return expiration_dates
  }).map((date) => {
    temp_obj[date.month] = new Simulation({
      name: product.name,
      symbol: product.symbol,
      date: date.month,
      db: db
    })
  })
  return temp_obj
}

/**
 * initial data fetch when client first connects and turns on data subscription
 * @param  {string} name            name of product
 * @param  {string} expiration_date expiration date of product
 */
export function getData(name, expiration_date) {
  console.log('hit get data')
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      console.log('simulations[name][expiration_date]', simulations[name][expiration_date])
      return simulations[name][expiration_date].retrieveData()
    }).then((data) => {
      let payload = {
        data: data,
        name: name,
        expiration_date: expiration_date
      }
      socket.write(JSON.stringify(payload))
      return simulations[name][expiration_date].subscribe()
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}
