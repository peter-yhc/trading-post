import withStyles from '@material-ui/core/es/styles/withStyles'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

const width = 400
const height = 280
const margin = {top: 20, right: 5, bottom: 20, left: 40}

const styles = {
  title: {
    fontSize: '14px'
  }
}

class StockTimeSeriesChart extends Component {

  state = {
    dataPoints: [],
    xScale: d3.scaleTime()
      .range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear()
      .range([height - margin.bottom, margin.top]),
    lineGenerator: d3.line(),
    xAxisRef: null,
    yAxisRef: null
  }

  titleRef = React.createRef()
  pathRefs = []

  xAxis = d3.axisBottom().scale(this.state.xScale)
  yAxis = d3.axisLeft().scale(this.state.yScale)

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.historicalData) return null // data hasn't been loaded yet so do nothing

    const {filteredDates, filteredPrices} = truncateDataToInterval(nextProps.historicalData, nextProps.interval)
    const timeDomain = d3.extent(filteredDates.map(it => new Date(it * 1000)))
    const priceDomainPadding = Math.abs(d3.max(filteredPrices) - d3.min(filteredPrices)) / 10

    const {xScale, yScale, lineGenerator} = prevState

    // Set data values and generate line
    xScale.domain(timeDomain)
    yScale.domain([d3.min(filteredPrices) - priceDomainPadding, d3.max(filteredPrices) + priceDomainPadding])

    lineGenerator.x(d => xScale(d.time))
    lineGenerator.y(d => yScale(d.price))
    const mergedData = mergeData(filteredDates, filteredPrices)

    const dataPoints = []
    const slopes = calculateDerivative(filteredPrices, 1)
    for (let i = 0; i < mergedData.length - 1; i++) {
      dataPoints.push({
        svg: lineGenerator([mergedData[i], mergedData[i + 1]]),
        slope: Math.sqrt(Math.abs(slopes[i])) * slopes[i] / Math.abs(slopes[i])
      })
    }
    return {dataPoints}
  }

  componentDidUpdate() {
    this.xAxis
      .ticks(defineTimeAxisIntervals(this.props.interval))
      .tickFormat(defineTimeAxisFormat(this.props.interval))
    this.yAxis
      .ticks(8)
      .tickFormat(d => `$${d.toFixed(2)}`)

    d3.select(this.state.xAxisRef).call(this.xAxis)
    d3.select(this.state.yAxisRef).call(this.yAxis)
    d3.select(this.titleRef.current).text(this.props.title)
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

  createMultiplePath() {
    const paths = []
    this.state.dataPoints.forEach((dataPoint, i) => {
      this.pathRefs[i] = this.pathRefs[i] ? this.pathRefs[i] : React.createRef()
      paths.push(<path key={i} ref={this.pathRefs[i]} d={dataPoint.svg} fill='none' strokeWidth='2' stroke={`rgb( ${-dataPoint.slope * 100 + 150}, ${dataPoint.slope * 100 + 150}, ${dataPoint.slope * 25 + 125})`}/>)
    })

    return paths

  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <svg width={'100%'} height={height}
             viewBox={`0 0 ${width} ${height}`}
             preserveAspectRatio="xMidYMid meet">
          <text ref={this.titleRef} className={classes.title} x={width / 2} y={margin.top}/>
          {this.createMultiplePath()}
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
      price: filteredPrices[i],
      time: new Date(filteredDates[i] * 1000)
    })
  }
  return data
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

function calculateDerivative(dataArray, step) {
  for (let i = 0; i < step; i++) {
    dataArray.push(dataArray[dataArray.length-1])
  }
  const derivatives = []
  for (let i = 0; i < dataArray.length - step; i++) {
    derivatives.push((dataArray[i + step] - dataArray[i]))
  }

  const max = Math.max(...derivatives)
  return derivatives.map(d => d/max)
}

StockTimeSeriesChart.propTypes = {
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

export default withStyles(styles)(StockTimeSeriesChart)
