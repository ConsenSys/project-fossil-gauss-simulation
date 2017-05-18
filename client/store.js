import * as reducers from './reducers/index'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
console.log('reducers', reducers)
const reducer = combineReducers({...reducers})
const store = createStore(reducer, applyMiddleware(thunk))
console.log('store', store)
export default store
