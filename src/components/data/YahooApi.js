import axios from 'axios'

export default {
  getBasicData: async () => {
    const response = await axios.get('https://cors.io/?https://query1.finance.yahoo.com/v8/finance/chart/AAPL?symbol=AAPL&period1=1498485600&period2=1504533600&interval=1d')
    const data = response.data.chart.result[0]

    return {
      symbol: data.meta.symbol,
      currency: data.meta.currency,
      exchange: data.meta.exchangeName,
      time: data.timestamp,
      close: data.indicators.quote[0].close
    }
  }
}