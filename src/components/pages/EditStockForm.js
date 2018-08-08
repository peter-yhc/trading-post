import {Button, Icon} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React, {Component} from 'react'

const styles = theme => ({
  button: {
    marginLeft: '0.2em',
    marginBottom: theme.spacing.unit
  }
})

class EditStockForm extends Component {

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}>
          <Icon>edit</Icon>
        </Button>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(EditStockForm)
