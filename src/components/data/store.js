import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {getDisplay, updateDisplay, updateStocks} from './DataPersist'

const reducer = (state, action) => {
  switch (action.type) {
    case 'STOCK_CREATE':
      updateStocks(action.payload.symbol, action.payload)
      return {
        ...state,
        stocks: [ ...state.stocks, action.payload ]
      }
    case 'STOCK_UPDATE':
      updateStocks(action.payload.symbol, action.payload)
      return {
        ...state,
        stocks: state.stocks.map(el => {
          return el.symbol === action.payload.symbol
            ? Object.assign({}, el, action.payload)
            : el
        })
      }
    case 'DISPLAY_UPDATE':
      const updatedTracking = updateDisplay(action.payload.symbol, action.payload.displayType)
      return {
        ...state,
        display: updatedTracking
      }
    default:
      return {
        stocks: JSON.parse(localStorage.getItem('stocks')) || [],
        display: getDisplay()
      }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
