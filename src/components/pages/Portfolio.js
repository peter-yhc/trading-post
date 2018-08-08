import React, {Component} from 'react'
import {Button, Grid, Icon} from '@material-ui/core/es'
import withStyles from '@material-ui/core/es/styles/withStyles'
import AddStockForm from './AddStockForm'
import {stocks} from '../data/StockData'
import {PortfolioTable} from './PortfolioTable'

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  button: {
    marginLeft: '0.2em',
    marginBottom: theme.spacing.unit
  }
})

class Portfolio extends Component {

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
    const {classes} = this.props
    return (
      <React.Fragment>
        <Grid item sm={12}>
          <Grid container direction="row" justify="flex-end">
            <AddStockForm onSubmit={this.handleNewStock}/>
            <Button
              color="secondary"
              variant="contained"
              className={classes.button}>
              <Icon>edit</Icon>
            </Button>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <PortfolioTable data={stocks}/>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Portfolio)
