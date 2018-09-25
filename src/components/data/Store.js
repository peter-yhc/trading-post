import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createAccount, deleteStock, getAccounts, updateAccountCache, updateStocksCache} from './DataPersist'

const reducer = (state, action) => {
  switch (action.type) {
    case 'READY': {
      return {
        ...state,
        status: 'READY'
      }
    }
    case 'STOCK_CREATE': {
      updateStocksCache(action.payload.symbol, action.payload)
      return {
        ...state,
        stocks: [...state.stocks, action.payload]
      }
    }
    case 'STOCK_UPDATE': {
      updateStocksCache(action.payload.symbol, action.payload)
      if (!state.stocks) {
        state.stocks = {}
      }
      return {
        ...state,
        stocks: {
          ...state.stocks,
          [action.payload.symbol]: action.payload
        }
      }
    }
    case 'STOCK_DELETE': {
      const stockSymbol = action.payload.symbol
      const accountName = action.payload.accountName

      delete state.accounts[accountName].stocks[stockSymbol]
      updateAccountCache(accountName, state.accounts[accountName])
      removeStockIfLast(state, stockSymbol)
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [accountName]: state.accounts[accountName]
        }
      }
    }
    case 'ACCOUNT_LOAD': {
      const accounts = getAccounts()
      return {
        ...state,
        accounts: accounts
      }
    }
    case 'ACCOUNT_CREATE': {
      const accountName = action.payload.name
      const createdAccount = createAccount(accountName)
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [accountName]: createdAccount
        }
      }
    }
    case 'ACCOUNT_STOCK_ADD': {
      const accountName = action.payload.accountName
      const accountCache = state.accounts
      const stockCache = state.stocks

      const currentMarketValue = stockCache[action.payload.symbol].previousClose * action.payload.shares
      accountCache[accountName].stocks[action.payload.symbol] = {
        symbol: action.payload.symbol,
        shares: action.payload.shares,
        bookCost: action.payload.bookCost,
        marketValue: currentMarketValue.toFixed(2),
        unrealisedGains: (currentMarketValue - action.payload.bookCost).toFixed(2)
      }

      updateAccountCache(accountName, state.accounts[accountName])
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [action.payload.accountName]: accountCache[accountName]
        }
      }
    }
    default:
      console.log('unknown type: ' + action.type)
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

function removeStockIfLast(state, symbol) {
  const stockInUse = Object.values(state.accounts).some(account => {
    return account.stocks[symbol] !== undefined
  })

  if (stockInUse === false) {
    delete state.stocks[symbol]
    deleteStock(symbol)
  }
}

export default store
