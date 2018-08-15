import axios from 'axios'

export default {
  getBasicData: async (symbol) => {
    const response = await axios.get(
      `https://cors.io/?https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d`)
    const data = response.data.chart.result[ 0 ]
    const closingData = data.indicators.quote[ 0 ].close

    return {
      symbol: data.meta.symbol,
      currency: data.meta.currency,
      exchange: data.meta.exchangeName,
      dailyClose: closingData ? closingData[ closingData.length - 1 ].toFixed(2) : 0
    }
  }
}
