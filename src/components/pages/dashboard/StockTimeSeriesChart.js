import {Grid, Typography} from '@material-ui/core/es/index'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'
import './StockTimeSeriesChart.css'

const MAX_TICKS = 5

export class StockTimeSeriesChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    this.setupData(this.props)
  }

  componentWillReceiveProps(props) {
    this.setupData(props)
  }

  setupData(props) {
    if (props.historicalData === undefined) {
      return
    }
    const {labels, data} = fitDataToChart(props.historicalData, props.startTime)
    this.setState({
      chartData: {
        labels,
        datasets: [
          {
            data
          }
        ]
      },
      loading: 'false'
    })
  }

  chartOptions = {
    maintainAspectRatio: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            maxTicksLimit: MAX_TICKS
          }
        }
      ]
    }
  }

  render() {
    if (this.state.loading !== 'false') {
      return (
        <Grid container alignItems="center" direction="column" justify="center">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </Grid>
      )
    }

    return (
      <React.Fragment>
        <Grid container alignItems="center" direction="column">
          <Typography variant="subheading">{this.props.title}</Typography>
          <Line data={this.state.chartData} options={this.chartOptions} width={100} height={50}/>
        </Grid>
      </React.Fragment>
    )
  }
}

function fitDataToChart({dates: historicalDates, closingPrices}, startTime) {

  const startingIndex = historicalDates.findIndex(unixtime => {
    return unixtime >= startTime
  })

  const chartPoints = closingPrices.slice(startingIndex, closingPrices.length)
  const chartLabels = historicalDates.slice(startingIndex, historicalDates.length)
                                     .map(unixtime => moment(unixtime * 1000).format('DD MMM'))

  return {
    labels: sampleDataForVisualisation(chartLabels),
    data: sampleDataForVisualisation(chartPoints)
  }
}

function sampleDataForVisualisation(array) {
  const sampleSize = parseInt(array.length / 50, 10)
  if (sampleSize === 0) return array

  const sampledArray = []
  for (let i = 0; i < array.length - 1; i++) {
    if (i % sampleSize === 0) {
      sampledArray.push(array[ array.length - 1 - i ])
    }
  }
  return trimDataPoints(sampledArray).reverse()
}

function trimDataPoints(array) {
  const extraDataCount = array % MAX_TICKS - 1
  if (extraDataCount !== 0) {
    array.slice(0, array.length - 1 - extraDataCount)
  }
  return array
}

StockTimeSeriesChart.propTypes = {
  title: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  historicalData: PropTypes.object
}
