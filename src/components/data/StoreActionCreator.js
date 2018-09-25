import moment from 'moment'
import {getStocks} from './DataPersist'
import YahooApi from './YahooApi'

export function initialise() {
  return (dispatch) => {
    new Promise(resolve => {
      dispatch({ type: 'ACCOUNT_LOAD' })

      Object.values(getStocks()).forEach(stock => {
        if (stock.fetchedAt === undefined || moment().diff(stock.fetchedAt, 'days') > 0) {
          dispatch(updateStockWithLiveDataMinimal(stock, resolve))
        } else {
          dispatch(updateStockWithCacheData(stock))
          resolve()
        }
      })
    }).then(() => {
      dispatch({
        type: 'READY'
      })
    })
  }
}

export function updateStockWithLiveDataMinimal(symbol, resolve) {
  return async (dispatch) => {
    const apiData = await YahooApi.getStockHistory(symbol)

    dispatch({
      type: 'STOCK_UPDATE',
      payload: {
        symbol,
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
