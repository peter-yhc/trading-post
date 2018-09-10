import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {ACCOUNT} from '../../data/DataPersist'
import {updateStockWithCacheData, updateStockWithLiveData} from '../../data/StoreActionCreator'
import PortfolioAccount from './PortfolioAccount'

function Portfolio(props) {

  const portfolioStocks = props.stocks.filter(stock => {
    return props.display.portfolio.findIndex(it => it === stock.symbol) !== -1
  })

  return (
    <React.Fragment>
      <PortfolioAccount title={"My Test Account"}
                        stocks={portfolioStocks}
                        onStockAdd={props.onStockAdd}
                        onStockUpdate={props.onStockUpdate}
                        onStockDelete={props.onStockDelete}/>
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
      dispatch(updateStockWithLiveData(stock))
      dispatch({
        type: 'DISPLAY_UPDATE',
        payload: { symbol: stock.symbol, displayType: ACCOUNT.PORTFOLIO }
      })
    },
    onStockUpdate: (stock) => {
      dispatch(updateStockWithCacheData(stock))
    },
    onStockDelete: (stock) => {
      dispatch({
        type: 'STOCK_DELETE',
        payload: { symbol: stock.symbol, displayOption: stock.displayOption }
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio))
