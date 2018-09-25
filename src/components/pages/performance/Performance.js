import {Grid, Typography} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const styles = theme => ({
  tableHeading: {
    marginBottom: theme.spacing.unit
  }
})

function Performance(props) {
  const { classes } = props

  return (
    <React.Fragment>
      <Grid item>
        <Typography className={classes.tableHeading} variant={'subheading'}>Work in progress</Typography>
      </Grid>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return state
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Performance)))
