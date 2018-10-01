import {Grid, NativeSelect, Typography} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import StockTimeSeriesChart, {ChartIntervalEnum as CHART} from './StockTimeSeriesChart'

const styles = {
  chartContainer: {
    paddingTop: '1em'
  }
}

class Dashboard extends Component {

  state = {
    selectValue: CHART.MONTH,
    accountSelection: 'all'
  }

  generateCharts = () => {
    const charts = []
    const filteredStocks = filterStocksByAccount(this.props.accounts, this.props.stocks, this.state.accountSelection)

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

  generateDisplayDropdown = () => {
    const options = [
      <option value={'all'} key={'all'}>All</option>
    ]

    Object.keys(this.props.accounts).forEach(key => {
      options.push(<option value={key} key={key}>{key}</option>)
    })
    return options
  }

  changeChartPeriod = (event) => {
    this.setState({
      selectValue: parseInt(event.target.value, 10)
    })
  }

  changeDisplay = (event) => {
    this.setState({
      accountSelection: event.target.value
    })
  }

  render() {
    if (this.props.status !== 'READY') {
      return (
        <React.Fragment>
          <Typography variant={'subheading'}>Loading...</Typography>
        </React.Fragment>
      )
    } else if (!this.props.stocks || this.props.stocks.length === 0) {
      return (
        <React.Fragment>
          <Typography variant={'subheading'}>Add some stocks to your account to get started</Typography>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Grid container spacing={24} justify={'flex-start'}>
            <Grid item>
              <NativeSelect
                value={this.state.accountSelection}
                onChange={this.changeDisplay}>
                {this.generateDisplayDropdown()}
              </NativeSelect>
            </Grid>
            <Grid item>
              <NativeSelect
                value={this.state.selectValue}
                onChange={this.changeChartPeriod}>
                <option value={CHART.MONTH}>1 Month</option>
                <option value={CHART.HALF_YEAR}>6 Months</option>
                <option value={CHART.YEAR}>1 Year</option>
                <option value={CHART.FIVE_YEARS}>5 Years</option>
              </NativeSelect>
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

function filterStocksByAccount(accounts, stocks, selection) {
  if (selection !== 'all') {
    const displayStocks = []
    Object.keys(accounts[selection].stocks).forEach(key => {
      displayStocks.push(stocks[key])
    })
    return displayStocks
  } else {
    return Object.values(stocks)
  }
}

function mapStateToProps(state) {
  return state
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Dashboard)))
