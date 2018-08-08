import {Grid} from '@material-ui/core/es'
import React, {Component} from 'react'
import {stocks} from '../data/StockData'
import AddStockForm from './AddStockForm'
import EditStockForm from './EditStockForm'
import {PortfolioTable} from './PortfolioTable'

export class Portfolio extends Component {

  state = {
    stocks: stocks
  }

  handleNewStock = (newStock) => {
    console.log('Submit received  ' + JSON.stringify(newStock))
    const stocks = this.state.stocks
    stocks.push({
      name: newStock.name.toUpperCase(),
      exchange: newStock.exchange.toUpperCase(),
      currency: newStock.currency.toUpperCase(),
      shares: newStock.shares,
      bookCost: newStock.bookCost,
      marketValue: 0,
      unrealisedGains: 0
    })
    this.setState({stocks})
  }

  render() {
    return (
      <React.Fragment>
        <Grid item sm={12}>
          <Grid container direction="row" justify="flex-end">
            <AddStockForm onSubmit={this.handleNewStock}/>
            <EditStockForm/>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <PortfolioTable data={stocks}/>
        </Grid>
      </React.Fragment>
    )
  }
}
