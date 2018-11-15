import {Grid, Typography} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import StockTimeSeriesChart, {ChartIntervalEnum as CHART} from './StockTimeSeriesChart'
import AccountSelector from './AccountSelector'
import {TimePeriodSlider} from './TimePeriodSelector'

const styles = {
  chartContainer: {
    paddingTop: '1em'
  }
}

class Dashboard extends Component {

  state = {
    selectValue: CHART.MONTH
  }

  generateCharts = () => {
    const charts = []
    const filteredStocks = filterStocksByAccount(this.props.accounts, this.props.stocks)

    filteredStocks.forEach(stock => {
      charts.push(
        <Grid key={stock.symbol}
              item md={6} lg={4}
              className={this.props.classes.chartContainer}>
          <StockTimeSeriesChart title={stock.symbol}
                                interval={this.state.selectValue}
                                historicalData={stock.history}/>
        </Grid>
      )
    })
    return charts
  }

  changeChartPeriod = value => {
    this.setState({
      selectValue: parseInt(value, 10)
    })
  }

  render() {
    if (this.props.status !== 'READY') {
      return (
        <React.Fragment>
          <Typography variant={'subtitle1'}>Loading...</Typography>
        </React.Fragment>
      )
    } else if (!this.props.stocks || this.props.stocks.length === 0) {
      return (
        <React.Fragment>
          <Typography variant={'subtitle1'}>Add some stocks to your account to get started</Typography>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Grid container spacing={24} justify={'flex-start'}>
            <Grid item sm={6}>
              <AccountSelector accounts={Object.values(this.props.accounts)}
                               handleChange={this.props.accountToggleDashboard}
              />
            </Grid>
            <Grid item sm={6}>
              <TimePeriodSlider value={this.state.selectValue} onChange={this.changeChartPeriod}/>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            {this.generateCharts()}
          </Grid>
        </React.Fragment>
      )
    }
  }
}

function filterStocksByAccount(accounts, stocks) {
  const displayStocks = []
  let stockKeys = new Set()

  Object.keys(accounts).forEach(key => {
    if (accounts[key].config.dashboard) {
      stockKeys = new Set([...stockKeys, ...Object.keys(accounts[key].stocks)])
    }
  })

  stockKeys.forEach(key => {
    if (stocks[key]) displayStocks.push(stocks[key])
  })
  return displayStocks
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    accountToggleDashboard(accountName, enabled) {
      dispatch({
        type: 'ACCOUNT_TOGGLE_DASHBOARD',
        payload: {accountName, enabled}
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard)))
