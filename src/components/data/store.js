import {createStore} from 'redux'

const initialState = {
  stocks: [{
    name: 'GOOG',
    shares: 1,
    bookCost: 532.18
  }, {
    name: 'VCN',
    shares: 1,
    bookCost: 16.92
  }, {
    name: 'BND',
    shares: 1,
    bookCost: 59.37
  }, {
    name: 'XAW',
    shares: 1,
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

const store = createStore(reducer)

export default store