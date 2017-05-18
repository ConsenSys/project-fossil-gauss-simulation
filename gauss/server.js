import express from 'express'
import Server from 'simple-websocket/server'
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
})
