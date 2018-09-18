import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createAccount, getAccounts, getDisplaySettings, updateDisplaySetting, updateStocksCache} from './DataPersist'

const reducer = (state, action) => {
  switch (action.type) {
    case 'STOCK_CREATE':
      console.log(action.payload)
      updateStocksCache(action.payload.symbol, action.payload)
      return {
        ...state,
        stocks: [ ...state.stocks, action.payload ]
      }
    case 'STOCK_UPDATE':
      updateStocksCache(action.payload.symbol, action.payload)
      return {
        ...state,
        stocks: state.stocks.map(el => {
          return el.symbol === action.payload.symbol
                 ? Object.assign({}, el, action.payload)
                 : el
        })
      }
    case 'STOCK_DELETE':
      const displayType = action.payload.displayOption
      const index = state.display[ displayType ].indexOf(action.payload.symbol)
      if (index > -1) state.display[ displayType ].splice(index, 1)

      return {
        ...state,
        display: {
          ...state.display,
          [ displayType ]: state.display[ displayType ]
        }
      }
    case 'DISPLAY_UPDATE':
      const updatedDisplay = updateDisplaySetting(action.payload.symbol, action.payload.displayType)
      return {
        ...state,
        display: updatedDisplay
      }
    case 'ACCOUNT_LOAD':
      const accounts = getAccounts()
      return {
        ...state,
        accounts: accounts
      }
    case 'ACCOUNT_CREATE':
      const accountName = action.payload.name
      const createdAccount = createAccount(accountName)
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [ accountName ]: createdAccount
        }
      }
    default:
      return {
        stocks: JSON.parse(localStorage.getItem('stocks')) || [],
        display: getDisplaySettings()
      }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
