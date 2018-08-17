import axios from 'axios'
import moment from 'moment'

const MAX_HISTORY = 24 * 60 * 60 * 365 * 5 // 5 years

export default {

  getStockHistory: async (symbol) => {
    let cache = JSON.parse(localStorage.getItem('stocks')) || []
    if (cache.length > 0) {
      const stock = cache.find(stock => stock.symbol === symbol)
      if (moment().diff(stock.fetchedAt, 'days') === 0) {
        console.log(`Cache is valid: ${symbol}`)
        return stock
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
    cache = JSON.parse(localStorage.getItem('stocks')) || [] // reload local storage to minimise run condition TODO make this synchronised
    const cachedDataIndex = cache.findIndex(stock => stock.symbol === symbol)
    if (cachedDataIndex !== -1) {
      cache[cachedDataIndex] = result
    } else {
      cache.push(result)
    }
    localStorage.setItem('stocks', JSON.stringify(cache))
    return result
  }
}

