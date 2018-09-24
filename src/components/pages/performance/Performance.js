import {Grid, Typography} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {ACCOUNT} from '../../data/DataPersist'
import {PortfolioTable} from '../portfolio/PortfolioTable'

const styles = theme => ({
  tableHeading: {
    marginBottom: theme.spacing.unit
  }
})

function Performance(props) {
  const portfolioStocks = props.stocks.filter(stock => {
    return props.display[ ACCOUNT.PORTFOLIO ].findIndex(it => it === stock.symbol) !== -1
  })

  const {classes} = props

  return (
    <React.Fragment>
      <Grid item>
        <Typography className={classes.tableHeading} variant={'subheading'}>Current Holdings</Typography>
        <PortfolioTable data={portfolioStocks}/>
      </Grid>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return state
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Performance)))
