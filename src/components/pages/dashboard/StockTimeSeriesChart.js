import {Grid, Typography} from '@material-ui/core/es/index'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'
import YahooApi from '../../data/YahooApi'
import './StockTimeSeriesChart.css'

export class StockTimeSeriesChart extends Component {

  state = {}

  async componentDidMount() {
    const timeSeriesData = await YahooApi.getTimeSeriesData(this.props.title, this.props.period)

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

StockTimeSeriesChart.propTypes = {
  title: PropTypes.string.isRequired,
  period: PropTypes.number.isRequired
}
