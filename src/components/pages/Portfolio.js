import {Grid} from '@material-ui/core/es'
import React from 'react'
import AddStockForm from './AddStockForm'
import EditStockForm from './EditStockForm'
import {PortfolioTable} from './PortfolioTable'
import {connect} from 'react-redux'

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
        type: 'NEW_STOCK',
        payload: {
          name: stock.name.toUpperCase(),
          shares: stock.shares,
          bookCost: stock.bookCost
        }
      })
    },
    onStockUpdate: (stock) => {
      dispatch({
        type: 'UPDATE_STOCK',
        payload: {
          name: stock.name.toUpperCase(),
          shares: stock.shares,
          bookCost: stock.bookCost
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)