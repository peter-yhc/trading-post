import {Grid, NativeSelect} from '@material-ui/core/es/index'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import StockTimeSeriesChart, {ChartIntervalEnum as CHART} from './StockTimeSeriesChart'

class Dashboard extends Component {

  state = {
    selectValue: CHART.MONTH,
  }

  generateCharts = () => {
    const charts = []

    this.props.stocks.forEach(stock => {
      charts.push(
        <Grid item md={6} lg={4} key={stock.symbol}>
          <StockTimeSeriesChart title={stock.symbol}
                                interval={this.state.selectValue}
                                historicalData={stock.history}/>
        </Grid>
      )
    })
    return charts
  }

  changeChartPeriod = (event) => {
    this.setState({
      selectValue: parseInt(event.target.value, 10),
    })
  }


  render() {
    return (
      <React.Fragment>
        <NativeSelect
          value={this.state.selectValue}
          onChange={this.changeChartPeriod}>
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
