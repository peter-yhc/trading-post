import moment from 'moment'
import {getStocks} from './DataPersist'
import YahooApi from './YahooApi'

export function initialise() {
  return (dispatch) => {
    dispatch({ type: 'ACCOUNT_LOAD' })

    Object.values(getStocks()).forEach(stock => {
      if (stock.fetchedAt === undefined || moment().diff(stock.fetchedAt, 'days') > 0) {
        dispatch(updateStockWithLiveData(stock))
      } else {
        dispatch(updateStockWithCacheData(stock))
      }
    })
  }
}

export function updateStockWithLiveData(stock) {
  return async (dispatch) => {
    const apiData = await YahooApi.getStockHistory(stock.symbol)
    const currentMarketValue = apiData.dailyClose * stock.shares

    dispatch({
      type: 'STOCK_UPDATE',
      payload: Object.assign({}, stock, {
        currency: apiData.currency,
        exchange: apiData.exchange,
        marketValue: currentMarketValue.toFixed(2),
        unrealisedGains: (currentMarketValue - stock.bookCost).toFixed(2),
        previousClose: apiData.dailyClose,
        history: apiData.history,
        fetchedAt: apiData.fetchedAt
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
    resolve()
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
