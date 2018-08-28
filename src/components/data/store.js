import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {getTracking, updateStocks, updateTracking} from './DataPersist'

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW_STOCK':
      updateStocks(action.payload.symbol, action.payload)
      return {
        ...state,
        stocks: [ ...state.stocks, action.payload ]
      }
    case 'UPDATE_STOCK':
      updateStocks(action.payload.symbol, action.payload)
      return {
        ...state,
        stocks: state.stocks.map(el => {
          return el.symbol === action.payload.symbol
            ? Object.assign({}, el, action.payload)
            : el
        })
      }
    case 'TRACKING_UPDATE':
      const updatedTracking = updateTracking(action.payload.symbol)
      return {
        ...state,
        tracking: updatedTracking
      }
    default:
      return {
        stocks: JSON.parse(localStorage.getItem('stocks')) || [],
        tracking: getTracking()
      }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
