import {Grid, NativeSelect} from '@material-ui/core/es/index'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {StockTimeSeriesChart} from './StockTimeSeriesChart'

const CHART = {
  MONTH: 24 * 60 * 60 * 30,
  HALF_YEAR: 24 * 60 * 60 * 182,
  YEAR: 24 * 60 * 60 * 365,
  FIVE_YEARS: 24 * 60 * 60 * 365 * 5
}


class Dashboard extends Component {

  state = {
    chartData: {
      labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' ],
      stocks: [
        {
          name: 'AAPL',
          series: [ 65, 59, 80, 81, 56, 55, 40 ]
        },
        {
          name: 'GOOG',
          series: [ 65, 59, 80, 81, 56, 55, 40 ]
        },
        {
          name: 'FB',
          series: [ 65, 59, 80, 81, 56, 55, 40 ]
        }
      ]
    },
    chartStartTime: 1527811200
  }

  generateCharts = () => {
    const charts = []

    this.props.stocks.forEach(stock => {
      charts.push(
        <Grid item md={6} lg={4} key={stock.name}>
          <StockTimeSeriesChart title={stock.name} startTime={this.state.chartStartTime} historicalData={stock.history}/>
        </Grid>
      )
    })
    return charts
  }

  changeChartPeriod = (event) => {
    console.log('changing period')
    console.log(Math.round((new Date).getTime() / 1000) - parseInt(event.target.value))
    this.setState({
      chartStartTime: Math.round((new Date).getTime() / 1000) - parseInt(event.target.value)
    })
  }

  render() {
    return (
      <React.Fragment>
        <NativeSelect onChange={this.changeChartPeriod}>
          <option value={CHART.MONTH}>1 Month</option>
          <option value={CHART.HALF_YEAR}>6 Months</option>
          <option value={CHART.YEAR}>1 Year</option>
          <option value={CHART.FIVE_YEARS}>5 Years</option>
        </NativeSelect>
        <Grid container>
          {this.generateCharts()}
        </Grid>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default withRouter(connect(mapStateToProps)(Dashboard))
