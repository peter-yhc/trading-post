import YahooApi from './YahooApi'

export function getRealTimeDataForPortfolio(portfolioStocks) {
  console.log(portfolioStocks)
  return (dispatch) => {
    portfolioStocks.forEach(async stock => {
      const apiData = await YahooApi.getBasicData(stock.name)
      dispatch({
        type: 'UPDATE_STOCK',
        payload: createPayload(stock, apiData)
      })
    })
  }
}

export function getRealTimeDataForStock(stock) {
  return async (dispatch) => {
    const apiData = await YahooApi.getBasicData(stock.name)
    dispatch({
      type: 'UPDATE_STOCK',
      payload: createPayload(stock, apiData)
    })
  }
}

function createPayload(stock, apiData) {
  return Object.assign({}, stock, {
    currency: apiData.currency,
    exchange: apiData.exchange,
    marketValue: (apiData.close * stock.shares).toFixed(2)
  })
}
