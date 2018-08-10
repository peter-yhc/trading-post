import {Grid} from '@material-ui/core/es'
import React, {Component} from 'react'
import {portfolioStocks} from '../data/PortfolioData'
import AddStockForm from './AddStockForm'
import EditStockForm from './EditStockForm'
import {PortfolioTable} from './PortfolioTable'

export class Portfolio extends Component {

  state = {
    stocks: portfolioStocks
  }

  handleNewStock = (newStock) => {
    const stocks = this.state.stocks
    stocks.push({
      name: newStock.name.toUpperCase(),
      exchange: 'tbd',
      currency: 'tbd',
      shares: newStock.shares,
      bookCost: newStock.bookCost,
      marketValue: 0,
      unrealisedGains: 0
    })
    this.setState({stocks})
  }

  handleStockUpdate = (updatedStock) => {
    const stocks = this.state.stocks
    stocks.forEach(stock => {
      if (stock.name === updatedStock.name) {
        stock.bookCost = updatedStock.bookCost
        stock.shares = updatedStock.shares
      }
    })
    this.setState({stocks})
  }

  render() {
    return (
      <React.Fragment>
        <Grid item sm={12}>
          <Grid container direction="row" justify="flex-end">
            <AddStockForm onSubmit={this.handleNewStock}/>
            <EditStockForm onSubmit={this.handleStockUpdate} data={this.state.stocks}/>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <PortfolioTable data={this.state.stocks}/>
        </Grid>
      </React.Fragment>
    )
  }
}
