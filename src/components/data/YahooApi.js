import axios from 'axios'
import moment from 'moment'

const MAX_HISTORY = 24 * 60 * 60 * 365 * 5 // 5 years

export default {

  getStockHistory: async (symbol) => {
    const cache = localStorage.getItem(symbol)
    if (cache !== undefined) {
      const parsedCache = JSON.parse(cache)
      if (moment().diff(parsedCache.fetchedAt, 'days') === 0) {
        console.log(`Cache is valid: ${symbol}`)
        return JSON.parse(cache)
      }
    }

    const endingPeriod = Math.round(new Date().getTime() / 1000)
    const startingPeriod = endingPeriod - MAX_HISTORY
    const response = await axios.get(
      `https://cors.io/?https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startingPeriod}&period2=${endingPeriod}&interval=1d`)
    const data = response.data.chart.result[ 0 ]
    const closingData = data.indicators.quote[ 0 ].close

    const result = {
      symbol: data.meta.symbol,
      currency: data.meta.currency,
      exchange: data.meta.exchangeName,
      dailyClose: closingData ? closingData[ closingData.length - 1 ].toFixed(2) : 0,
      history: {
        dates: data.timestamp,
        closingPrices: closingData
      },
      fetchedAt: moment().format('YYYY-MM-DD')
    }
    console.log('setting storage for ' + symbol)
    localStorage.setItem(symbol, JSON.stringify(result))
    return result
  }
}

