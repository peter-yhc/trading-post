import {Grid} from '@material-ui/core/es'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getRealTimeDataForStock} from '../../data/storeActionCreator'
import AddStockForm from './AddStockForm'
import EditStockForm from './EditStockForm'
import {PortfolioTable} from './PortfolioTable'

function Portfolio(props) {
  return (
    <React.Fragment>
      <Grid item sm={12}>
        <Grid container direction="row" justify="flex-end">
          <AddStockForm onSubmit={props.onStockAdd}/>
          <EditStockForm onSubmit={props.onStockUpdate} data={props.stocks}/>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <PortfolioTable data={props.stocks}/>
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
        type: 'TRACKING_UPDATE',
        payload: {symbol: 'AAPL'}
      })
    },
    onStockUpdate: (stock) => {
      dispatch(getRealTimeDataForStock(stock))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio))
