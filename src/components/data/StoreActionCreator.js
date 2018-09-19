import moment from 'moment'
import {getStocks} from './DataPersist'
import YahooApi from './YahooApi'

export function initialise() {
  return (dispatch) => {
    getStocks().forEach(stock => {
      if (stock.fetchedAt === undefined || moment().diff(stock.fetchedAt, 'days') > 0) {
        dispatch(updateStockWithLiveData(stock))
      } else {
        dispatch(updateStockWithCacheData(stock))
      }
    })
    dispatch({type: 'ACCOUNT_LOAD'})
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

export function updateStockWithLiveDataMinimal(symbol) {
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
  }
}

export function updateStockWithCacheData(stock) {
  const result = getStocks().filter(cache => cache.symbol === stock.symbol)
  if (result.size === 0) {
    console.log(`Attempting to update symbol ${stock.symbol} without a cache.`)
  }

  return async (dispatch) => {
    const currentMarketValue = result[ 0 ].previousClose * stock.shares

    dispatch({
      type: 'STOCK_UPDATE',
      payload: Object.assign({}, stock, {
        marketValue: currentMarketValue.toFixed(2),
        unrealisedGains: (currentMarketValue - stock.bookCost).toFixed(2)
      })
    })
  }
}
