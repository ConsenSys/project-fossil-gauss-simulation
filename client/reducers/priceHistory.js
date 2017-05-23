import { Dates } from '../products'

const INIT_STATE = {
  price_history: {
    'Brent Crude Oil Financial Futures': [],
    'Brent Crude Oil Futures': [],
    'Canadian Heavy Crude Oil BALMO Futures': [],
    'Crude Oil Financial Futures': [],
    'LLS (Angus) vs. Brent Balmo Futures': [],
    'LLS (Angus) vs. WTI Balmo Futures': [],
    'LLS (Angus) vs. WTI Financial Futures': [],
    'WTI Financial Futures': [],
    'WTI-Brent Financial Futures': [],
  },
  products: [
    'Brent Crude Oil Financial Futures',
    'Brent Crude Oil Futures',
    'Canadian Heavy Crude Oil BALMO Futures',
    'Crude Oil Financial Futures',
    'LLS (Angus) vs. Brent Balmo Futures',
    'LLS (Angus) vs. WTI Balmo Futures',
    'LLS (Angus) vs. WTI Financial Futures',
    'WTI Financial Futures',
    'WTI-Brent Financial Futures',
  ],
  dates: Dates,
  initial_date: '2017-01-01',
  productView: 'Brent Crude Oil Financial Futures'
}

export default function priceHistory(state = INIT_STATE, action) {
  switch(action.type) {
    case 'CHANGE_PRODUCT_VIEW':
      return {
        ...state,
        productView: action.value
      }
      break
    case 'UPDATE_PRICE_HISTORY':
      console.log('hit reducer with data payload', action)
      let name = action.name
      console.log('name', name)
      console.log('state', state.price_history[action.name])
      console.log('action.data', action.data)
      return {
        ...state,
        price_history: {
          ...state.price_history,
          [name]: state.price_history[name].concat(action.data)
        }
      }
      break;
    default:
      return state
      break
  }
}
