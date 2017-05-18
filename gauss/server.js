import express from 'express'
import Server from 'simple-websocket/server'
import { Products, Dates } from './products'
import Promise from 'bluebird'
import Simulation from './Simulation'
import sublevel from 'level-sublevel'
import levelup from 'levelup'

/*
///////////////////////////////////////////////////
RESTFUL SERVER
//////////////////////////////////////////////////
*/
const app = express()

app.listen(3004, () => {
  console.log('#### RESTFUL INTERFACE LISTENING ON PORT 3004')
})

/*
///////////////////////////////////////////////////
WEBSOCKET SERVER
//////////////////////////////////////////////////
*/
const websocket = new Server({ port: 3003 })

websocket.on('connection', (socket) => {
  console.log('#### WEBSOCKET CONNECTED ON PORT 30003')
  startSimulations(Products, Dates)
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
