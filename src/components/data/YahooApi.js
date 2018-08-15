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
  },

  getTimeSeriesData: async (symbol, chartInterval) => {
    const interval = determineAppropriateDataInterval(chartInterval)
    const endingPeriod = Math.round((new Date).getTime() / 1000)
    const startingPeriod = endingPeriod - chartInterval
    const response = await axios.get(
      `https://cors.io/?https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startingPeriod}&period2=${endingPeriod}&interval=${interval}`)
    const data = response.data.chart.result[ 0 ]
    
    return {
      symbol,
      timeSeries: data.timestamp.map(unixtime => new Date(unixtime * 1000).toLocaleDateString("en-au")),
      dataSeries: data.indicators.quote[ 0 ].close
    }
  }
}

function determineAppropriateDataInterval(chartingPeriod) {
  switch (chartingPeriod) {
    case CHART.FIVE_YEARS:
      return DATA_INTERVAL.MONTH
    case CHART.YEAR:
      return DATA_INTERVAL.WEEK
    case CHART.MONTH:
      return DATA_INTERVAL.DAY
    default:
      return DATA_INTERVAL.DAY
  }
}

export const CHART = {
  MONTH: 24 * 60 * 60 * 30,
  YEAR: 24 * 60 * 60 * 365,
  FIVE_YEARS: 24 * 60 * 60 * 365 * 5
}

const DATA_INTERVAL = {
  DAY: '1d',
  WEEK: '5d',
  MONTH: '1mo'
}
