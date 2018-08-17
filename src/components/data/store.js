import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW_STOCK':
      return {
        ...state,
        stocks: [...state.stocks, action.payload]
      }
    case 'UPDATE_STOCK':
      return {
        ...state,
        stocks: state.stocks.map(el => {
          return el.symbol === action.payload.symbol
                 ? Object.assign({}, el, action.payload)
                 : el
        })
      }
    default:
      return {stocks: JSON.parse(localStorage.getItem('stocks')) || []}
  }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
