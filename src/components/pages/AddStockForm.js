import React, {Component} from 'react'
import {Button, Dialog, DialogActions, DialogContent, Icon, TextField} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'

const styles = theme => ({
  button: {
    marginLeft: '0.2em',
    marginBottom: theme.spacing.unit
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class AddStockForm extends Component {

  state = {
    open: false,
    errorText: undefined,
    shares: 1,
    error: false
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  validateNumber = (event) => {
    this.setState({shares: event.target.value})
    if (event.target.value.match(/^\d+$/)) {
      this.setState({error: false})
      this.setState({errorText: undefined})
    } else {
      this.setState({error: true})
      this.setState({errorText: 'Invalid number'})
    }
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={this.handleClickOpen}>
          <Icon>add</Icon>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}>
          <DialogContent>
            <form className={classes.formContainer}>
              <TextField
                label="New symbol to track"
                className={classes.textField}
                value={this.state.symbol}
                margin="normal"/>
              <TextField
                label="Number of shares owned"
                className={classes.textField}
                value={this.state.shares}
                onChange={this.validateNumber}
                error={this.state.error}
                helperText={this.state.errorText}
                margin="normal"/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(AddStockForm)
