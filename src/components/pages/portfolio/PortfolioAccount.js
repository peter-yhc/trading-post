import {Grid} from '@material-ui/core/es'
import {Typography} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import PropTypes from 'prop-types'
import React from 'react'
import {withRouter} from 'react-router-dom'
import AddStockForm from './AddStockForm'
import EditStockForm from './EditStockForm'
import {PortfolioTable} from './PortfolioTable'

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit*1.5
  }
})

function PortfolioAccount(props) {
  return (
    <React.Fragment>
      <Grid container direction="row" justify="flex-end">
        <Grid sm={6} item container direction="row" justify="flex-start">
          <Typography className={props.classes.title} variant={'subheading'}>{props.title}</Typography>
        </Grid>
        <Grid sm={6} item container direction="row" justify="flex-end">
          <AddStockForm onSubmit={props.onStockAdd}/>
          <EditStockForm data={Object.values(props.stocks)} onSubmit={props.onStockUpdate} onDelete={props.onStockDelete}/>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <PortfolioTable data={props.stocks}/>
      </Grid>
    </React.Fragment>
  )
}

PortfolioAccount.propTypes = {
  onStockUpdate: PropTypes.func.isRequired,
  onStockDelete: PropTypes.func.isRequired,
  onStockAdd: PropTypes.func.isRequired
}

export default withRouter( withStyles(styles)(PortfolioAccount))
