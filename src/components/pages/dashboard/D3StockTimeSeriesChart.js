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
    yAxisRef: null
  }

  xAxis = d3.axisBottom().scale(this.state.xScale)
            .tickFormat(d3.timeFormat('%b, %Y'))
  yAxis = d3.axisLeft().scale(this.state.yScale)
            .tickFormat(d => `$${d}`)

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.historicalData) return null // data hasn't been loaded yet so do nothing

    const historicalDates = nextProps.historicalData.dates
    const historicalPrices = nextProps.historicalData.closingPrices

    const data = []
    for (let i = 0; i < historicalDates.length; i++) {
      data.push({
        price: historicalPrices[ i ],
        time: new Date(historicalDates[ i ] * 1000)
      })
    }

    const {xScale, yScale, lineGenerator} = prevState

    // data has changed, so recalculate scale domains
    const timeDomain = d3.extent(historicalDates.map(it => new Date(it * 1000)))
    const priceMargin = Math.abs(d3.max(historicalPrices) - d3.min(historicalPrices)) / 10

    xScale.domain(timeDomain)
    yScale.domain([ d3.min(historicalPrices) - priceMargin, d3.max(historicalPrices) + priceMargin ])

    // calculate line for lows
    lineGenerator.x(d => xScale(d.time))
    lineGenerator.y(d => yScale(d.price))
    const prices = lineGenerator(data)
    return {prices}
  }

  componentDidUpdate() {
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

D3StockTimeSeriesChart.propTypes = {
  title: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  historicalData: PropTypes.object
}

export default D3StockTimeSeriesChart
