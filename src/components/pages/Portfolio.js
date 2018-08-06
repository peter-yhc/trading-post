import React, {Component} from 'react'
import {Button, Grid, Icon, Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core/es'
import withStyles from '@material-ui/core/es/styles/withStyles'
import {stocks} from '../data/StockData'
import NumberFormat from 'react-number-format'

const styles = ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  button: {
    marginLeft: "0.2em"
  }
})

class Portfolio extends Component {

  state = {
    stocks: stocks
  }

  createTable() {
    let table = []
    this.state.stocks.forEach(stock => {
      table.push(<TableRow>
        <TableCell>{stock.name}</TableCell>
        <TableCell>{stock.exchange}</TableCell>
        <TableCell>{stock.currency}</TableCell>
        <TableCell>{stock.shares}</TableCell>
        <TableCell>
          <NumberFormat value={stock.bookCost} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </TableCell>
        <TableCell>
          <NumberFormat value={stock.marketValue} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </TableCell>
        <TableCell>
          <NumberFormat value={stock.unrealisedGains} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </TableCell>
      </TableRow>)
    })
    return table
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Grid item sm={12}>
          <Grid container direction="row" justify="flex-end">
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              <Icon>add</Icon>
            </Button>
            <Button
              color="secondary"
              variant="contained"
              className={classes.button}
            >
              <Icon>edit</Icon>
            </Button>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Exchange</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Shares</TableCell>
                  <TableCell>Book Cost</TableCell>
                  <TableCell>Market Value</TableCell>
                  <TableCell>Unrealised Gains</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.createTable()}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Portfolio)
