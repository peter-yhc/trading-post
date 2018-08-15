import {Grid, NativeSelect} from '@material-ui/core/es/index'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {CHART} from '../../data/YahooApi'
import {StockTimeSeriesChart} from './StockTimeSeriesChart'

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
    chartPeriod: CHART.MONTH
  }

  generateCharts = () => {
    const charts = []

    this.state.chartData.stocks.forEach(stock => {
      charts.push(
        <Grid item md={6} lg={4} key={stock.name}>
          <StockTimeSeriesChart title={stock.name} period={this.state.chartPeriod}/>
        </Grid>
      )
    })
    return charts
  }

  changeChartPeriod = (event) => {
    this.setState({
      chartPeriod: parseInt(event.target.value)
    })
  }

  render() {
    return (
      <React.Fragment>
        <NativeSelect onChange={this.changeChartPeriod}>
          <option value={CHART.MONTH}>1 Month</option>
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

export default withRouter(Dashboard)
