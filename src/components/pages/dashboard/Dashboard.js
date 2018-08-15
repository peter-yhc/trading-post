import {Grid, Typography} from '@material-ui/core/es/index'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
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
    }
  }

  generateCharts = () => {
    const charts = []

    this.state.chartData.stocks.forEach(stock => {
      charts.push(
        <Grid item sm={6} md={4}>
          <StockTimeSeriesChart title={stock.name} labels={this.state.chartData.labels} data={stock.series}/>
        </Grid>
      )
    })
    return charts
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="headline">
          Dashboard
        </Typography>
        <Grid container>
          {this.generateCharts()}
        </Grid>
      </React.Fragment>
    )
  }
}

export default withRouter(Dashboard)
