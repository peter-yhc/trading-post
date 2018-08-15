import {Grid, Typography} from '@material-ui/core/es/index'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'
import YahooApi from '../../data/YahooApi'
import './StockTimeSeriesChart.css'

const MAX_TICKS = 5

export class StockTimeSeriesChart extends Component {

  state = {}

  async componentWillReceiveProps(props) {
    const timeSeriesData = fitDataToChart(await YahooApi.getTimeSeriesData(props.title, props.period))

    this.setState({
      chartData: {
        labels: timeSeriesData.timeSeries,
        datasets: [
          {
            data: timeSeriesData.dataSeries
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
        } ]
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

function fitDataToChart(chartData) {
  const extraDataCount = chartData.timeSeries.length % MAX_TICKS - 1
  if (extraDataCount !== 0) {
    chartData.timeSeries = chartData.timeSeries.slice(extraDataCount, chartData.timeSeries.length)
    chartData.dataSeries = chartData.dataSeries.slice(extraDataCount, chartData.dataSeries.length)
  }
  return chartData
}

StockTimeSeriesChart.propTypes = {
  title: PropTypes.string.isRequired,
  period: PropTypes.number.isRequired
}
