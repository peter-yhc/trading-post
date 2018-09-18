import {Grid} from '@material-ui/core/es/index'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {ACCOUNT} from '../../data/DataPersist'
import {updateStockWithCacheData, updateStockWithLiveData} from '../../data/StoreActionCreator'
import PortfolioAccount from './PortfolioAccount'
import AddAccountForm from './AddAccountForm'
import {withStyles} from '@material-ui/core'

const styles = theme => ({
  accountFormContainer: {
    marginTop: theme.spacing.unit * 2
  },
  portfolioAccountContainer: {
    marginBottom: theme.spacing.unit * 3
  }
})

function Portfolio(props) {

  const {classes} = props

  function showAccounts() {
    const accounts = []
    Object.values(props.accounts).forEach(acc => {
      accounts.push(
        <Grid container className={classes.portfolioAccountContainer}>
          <PortfolioAccount
            title={acc.name}
            stocks={acc.stocks}
            onStockAdd={props.onStockAdd}
            onStockUpdate={props.onStockUpdate}
            onStockDelete={props.onStockDelete}/>
        </Grid>
      )
    })
    return accounts
  }

  return (
    <React.Fragment>
      {showAccounts()}
      <Grid container item direction={'row'} justify={'flex-end'}
            className={classes.accountFormContainer}>
        <AddAccountForm onSubmit={props.onAccountCreate}/>
      </Grid>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    onStockAdd: (accountName, stock) => {
      dispatch({
        type: 'STOCK_CREATE',
        payload: {
          accountName,
          symbol: stock.symbol,
          shares: stock.shares,
          bookCost: stock.bookCost
        }
      })
      dispatch(updateStockWithLiveData(stock))
      dispatch({
        type: 'DISPLAY_UPDATE',
        payload: {symbol: stock.symbol, displayType: ACCOUNT.PORTFOLIO}
      })
    },
    onStockUpdate: (stock) => {
      dispatch(updateStockWithCacheData(stock))
    },
    onStockDelete: (stock) => {
      dispatch({
        type: 'STOCK_DELETE',
        payload: {symbol: stock.symbol, displayOption: stock.displayOption}
      })
    },
    onAccountCreate: (account) => {
      dispatch({
        type: 'ACCOUNT_CREATE',
        payload: {name: account.name}
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Portfolio)))
