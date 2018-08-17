import YahooApi from './YahooApi'
import {retrieveStocks} from './DataPersist'
import moment from 'moment'

export function initialise() {
  return (dispatch) => {
    retrieveStocks().forEach(stock => {
      if (moment().diff(stock.fetchedAt, 'days') > 0) {
        dispatch(getRealTimeDataForStock(stock))
      } else {
        dispatch({
          type: 'UPDATE_STOCK',
          payload: stock
        })
      }
    })
  }
}

export function getRealTimeDataForStock(stock) {
  return async (dispatch) => {
    const apiData = await YahooApi.getStockHistory(stock.symbol)
    dispatch({
      type: 'UPDATE_STOCK',
      payload: createPayload(stock, apiData)
    })
  }
}

function createPayload(stock, apiData) {
  const currentMarketValue = apiData.dailyClose * stock.shares
  return Object.assign({}, stock, {
    currency: apiData.currency,
    exchange: apiData.exchange,
    marketValue: currentMarketValue.toFixed(2),
    unrealisedGains: (currentMarketValue - stock.bookCost).toFixed(2),
    history: apiData.history,
    fetchedAt: apiData.fetchedAt
  })
}
