import {Grid} from '@material-ui/core/es'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {DISPLAY} from '../../data/DataPersist'
import {getRealTimeDataForStock} from '../../data/StoreActionCreator'
import AddStockForm from './AddStockForm'
import EditStockForm from './EditStockForm'
import {PortfolioTable} from './PortfolioTable'

function Portfolio(props) {
  const portfolioStocks = props.stocks.filter(stock => {
    return props.display.portfolio.findIndex(it => it === stock.symbol) !== -1
  })
  return (
    <React.Fragment>
      <Grid item sm={12}>
        <Grid container direction="row" justify="flex-end">
          <AddStockForm onSubmit={props.onStockAdd}/>
          <EditStockForm data={portfolioStocks} onSubmit={props.onStockUpdate} onDelete={props.onStockDelete}/>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <PortfolioTable data={portfolioStocks}/>
      </Grid>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    onStockAdd: (stock) => {
      dispatch({
        type: 'STOCK_CREATE',
        payload: stock
      })
      dispatch(getRealTimeDataForStock(stock))
      dispatch({
        type: 'DISPLAY_UPDATE',
        payload: {symbol: stock.symbol, displayType: DISPLAY.PORTFOLIO}
      })
    },
    onStockUpdate: (stock) => {
      dispatch(getRealTimeDataForStock(stock))
    },
    onStockDelete: (stock) => {
      dispatch({
        type: 'STOCK_DELETE',
        payload: {symbol: stock.symbol, displayOption: stock.displayOption}
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio))
