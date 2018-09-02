import {Grid, NativeSelect} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import StockTimeSeriesChart, {ChartIntervalEnum as CHART} from './StockTimeSeriesChart'
import {DISPLAY} from '../../data/DataPersist'

const styles = {
  chartContainer: {
    paddingTop: '1em'
  }
}

class Dashboard extends Component {

  state = {
    selectValue: CHART.MONTH,
    displayValue: DISPLAY.ALL
  }

  generateCharts = () => {
    const charts = []
    const filteredStocks = filterStocksByDisplayType(this.props.display, this.props.stocks, this.state.displayValue)

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

  changeChartPeriod = (event) => {
    this.setState({
      selectValue: parseInt(event.target.value, 10)
    })
  }

  changeDisplay = (event) => {
    this.setState({
      displayValue: event.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={24} justify={'flex-start'}>
          <Grid item>
            <NativeSelect
              value={this.state.displayValue}
              onChange={this.changeDisplay}>
              <option value={DISPLAY.ALL}>All</option>
              <option value={DISPLAY.WATCHING}>Watching</option>
              <option value={DISPLAY.PORTFOLIO}>Portfolio</option>
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

function filterStocksByDisplayType(displays, stocks, type) {
  if (type !== DISPLAY.ALL) {
    return stocks.filter(stock => displays[ type ].includes(stock.symbol)) || []
  } else {
    return stocks
  }
}

function mapStateToProps(state) {
  return state
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Dashboard)))
