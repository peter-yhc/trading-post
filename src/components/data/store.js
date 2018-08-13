import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  stocks: [{
    name: 'GOOG',
    shares: 50,
    bookCost: 532.18
  }, {
    name: 'VCN.TO',
    shares: 197,
    bookCost: 16.92
  }, {
    name: 'BND',
    shares: 352,
    bookCost: 59.37
  }, {
    name: 'XAW.TO',
    shares: 206,
    bookCost: 22.08
  }]
}

const reducer = (state = initialState, action) => {
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
          return el.name === action.payload.name ?
            Object.assign({}, el, action.payload) :
            el
        })
      }
    default:
      return state
  }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
