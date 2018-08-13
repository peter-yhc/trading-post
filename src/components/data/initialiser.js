import YahooApi from './YahooApi'

export function getRealTimeData(portfolioStocks) {
  console.log(portfolioStocks)
  return (dispatch) => {

    portfolioStocks.forEach(async stock => {
      const basicData = await YahooApi.getBasicData(stock.name)
      dispatch({
        type: 'UPDATE_STOCK',
        payload: Object.assign({}, stock, {
          currency: basicData.currency,
          exchange: basicData.exchange,
          marketValue: basicData.close
        })
      })
    })
  }
}
