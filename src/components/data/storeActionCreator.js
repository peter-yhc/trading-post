import YahooApi from './YahooApi'

export function getRealTimeDataForPortfolio(portfolioStocks) {
  console.log(portfolioStocks)
  return (dispatch) => {
    portfolioStocks.forEach(async stock => {
      const apiData = await YahooApi.getStockHistory(stock.name)
      dispatch({
        type: 'UPDATE_STOCK',
        payload: createPayload(stock, apiData)
      })
    })
  }
}

export function getRealTimeDataForStock(stock) {
  return async (dispatch) => {
    const apiData = await YahooApi.getStockHistory(stock.name)
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
    history: apiData.history
  })
}
