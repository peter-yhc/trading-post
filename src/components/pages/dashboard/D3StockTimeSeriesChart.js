import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

const width = 400
const height = 280
const margin = {top: 20, right: 5, bottom: 20, left: 40}

class D3StockTimeSeriesChart extends Component {

  state = {
    prices: null,
    xScale: d3.scaleTime()
              .range([ margin.left, width - margin.right ]),
    yScale: d3.scaleLinear()
              .range([ height - margin.bottom, margin.top ]),
    lineGenerator: d3.line(),
    xAxisRef: null,
    yAxisRef: null,
    yAxisTickCountOverride: null
  }

  xAxis = d3.axisBottom().scale(this.state.xScale)
  yAxis = d3.axisLeft().scale(this.state.yScale)

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.historicalData) return null // data hasn't been loaded yet so do nothing

    const {filteredDates, filteredPrices} = truncateDataToInterval(nextProps.historicalData, nextProps.interval)
    // data has changed, so recalculate scale domains
    const timeDomain = d3.extent(filteredDates.map(it => new Date(it * 1000)))
    const priceDomainPadding = Math.abs(d3.max(filteredPrices) - d3.min(filteredPrices)) / 10

    const {xScale, yScale, lineGenerator} = prevState

    xScale.domain(timeDomain)
    yScale.domain([ d3.min(filteredPrices) - priceDomainPadding, d3.max(filteredPrices) + priceDomainPadding ])

    // calculate line for lows
    lineGenerator.x(d => xScale(d.time))
    lineGenerator.y(d => yScale(d.price))
    const prices = lineGenerator(mergeData(filteredDates, filteredPrices))
    return {prices, yAxisTickCountOverride: calculateYAxisTickCount(filteredPrices)}
  }

  componentDidUpdate() {
    this.xAxis
        .ticks(defineTimeAxisIntervals(this.props.interval))
        .tickFormat(defineTimeAxisFormat(this.props.interval))
    this.yAxis
        .ticks(this.state.yAxisTickCountOverride)
        .tickFormat(d => `$${d}`)

    d3.select(this.state.xAxisRef).call(this.xAxis)
    d3.select(this.state.yAxisRef).call(this.yAxis)
  }

  setRefX = element => {
    if (element) {
      this.setState({xAxisRef: element})
    }
  }

  setRefY = element => {
    if (element) {
      this.setState({yAxisRef: element})
    }
  }

  render() {
    return (
      <React.Fragment>
        <svg width={'100%'} height={height}
             viewBox={`0 0 ${width} ${height}`}
             preserveAspectRatio="xMidYMid meet">>
          <path d={this.state.prices} fill='none' stroke={'#eb6a5b'} strokeWidth='2'/>
          <g>
            <g ref={this.setRefX} transform={`translate(0, ${height - margin.bottom})`}/>
            <g ref={this.setRefY} transform={`translate(${margin.left}, 0)`}/>
          </g>
        </svg>
      </React.Fragment>
    )
  }
}

function calculateStartTime(interval) {
  return Math.round(new Date().getTime() / 1000) - interval
}

function truncateDataToInterval(historicalData, interval) {
  const filteredDates = historicalData.dates.filter(date => date >= calculateStartTime(interval))
  const filteredPrices = historicalData.closingPrices.slice(historicalData.closingPrices.length - filteredDates.length,
    historicalData.closingPrices.length)

  return {filteredDates, filteredPrices}
}

function mergeData(filteredDates, filteredPrices) {
  const data = []
  for (let i = 0; i < filteredDates.length; i++) {
    data.push({
      price: filteredPrices[ i ],
      time: new Date(filteredDates[ i ] * 1000)
    })
  }
  return data
}

function calculateYAxisTickCount(priceList) {
  const minMax = d3.extent(priceList)
  return minMax[ 1 ] - minMax[ 0 ] < 10 ? parseInt(minMax[ 1 ] - minMax[ 0 ], 10) : 10
}

function defineTimeAxisIntervals(interval) {
  switch (interval) {
    case ChartIntervalEnum.MONTH:
      return d3.timeMonday
    case ChartIntervalEnum.HALF_YEAR:
      return d3.timeMonth
    case ChartIntervalEnum.YEAR:
      return d3.timeMonth.every(2)
    default:
      return d3.timeYear
  }
}

function defineTimeAxisFormat(interval) {
  switch (interval) {
    case ChartIntervalEnum.MONTH:
      return d3.timeFormat('%d %b, %Y')
    default:
      return d3.timeFormat('%b, %Y')
  }
}

D3StockTimeSeriesChart.propTypes = {
  title: PropTypes.string.isRequired,
  interval: PropTypes.number.isRequired,
  historicalData: PropTypes.object
}

export const ChartIntervalEnum = Object.freeze({
    MONTH: 24 * 60 * 60 * 30,
    HALF_YEAR: 24 * 60 * 60 * 182,
    YEAR: 24 * 60 * 60 * 365,
    FIVE_YEARS: 24 * 60 * 60 * 365 * 5
  }
)

export default D3StockTimeSeriesChart
