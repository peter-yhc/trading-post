import moment from 'moment'
import {getStocks} from './DataPersist'
import YahooApi from './StockApi'

export function initialise() {
  return (dispatch) => {
    new Promise(resolve => {
      dispatch({ type: 'ACCOUNT_LOAD' })

      const stocks = Object.values(getStocks())
      if (stocks.length !== 0) {
        stocks.forEach(stock => {
          if (stock.fetchedAt === undefined || moment().diff(stock.fetchedAt, 'days') > 0) {
            dispatch(updateStockWithLiveData(stock, resolve))
          } else {
            dispatch(updateStockWithCacheData(stock))
            resolve()
          }
        })
      } else {
        resolve()
      }
    }).then(() => {
      dispatch({
        type: 'READY'
      })
    })
  }
}

export function updateStockWithLiveData(stock, resolve) {
  return async (dispatch) => {
    const apiData = await YahooApi.getStockHistory(stock.symbol)

    dispatch({
      type: 'STOCK_UPDATE',
      payload: {
        symbol: stock.symbol,
        currency: apiData.currency,
        exchange: apiData.exchange,
        previousClose: apiData.dailyClose,
        history: apiData.history,
        fetchedAt: apiData.fetchedAt
      }
    })
    if (resolve) {
      resolve()
    }
  }
}

export function updateStockWithCacheData(stock) {
  const result = getStocks()[stock.symbol]
  if (!result) {
    console.log(`Attempting to update symbol ${stock.symbol} without a cache.`)
  }
  return async (dispatch) => {
    dispatch({
      type: 'STOCK_UPDATE',
      payload: stock
    })
  }
}
