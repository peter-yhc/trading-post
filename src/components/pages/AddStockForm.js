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

function getDefaultState() {
  return {
    open: false,
    error: false,
    errorText: undefined,
    name: '',
    exchange: '',
    currency: '',
    shares: '',
    bookCost: ''
  }
}

class AddStockForm extends Component {

  state = getDefaultState()

  resetState = () => {
    this.setState(getDefaultState())
  }

  handleClickOpen = () => {
    const state = getDefaultState()
    state.open = true
    console.log(state)
    this.setState(state)
  }

  handleClose = () => {
    this.resetState()
  }

  handleSubmit = () => {
    console.log(this.state)
    this.props.onSubmit({
      name: this.state.name,
      exchange: this.state.exchange,
      currency: this.state.currency,
      shares: this.state.shares,
      bookCost: this.state.bookCost
    })
    this.resetState()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  validateNumber = (name, format) => event => {
    this.setState({[name]: event.target.value})
    const nameError = `${name}Error`
    const nameErrorText = `${name}ErrorText`
    if (event.target.value.match(format)) {
      this.setState({[nameError]: false})
      this.setState({[nameErrorText]: undefined})
    } else {
      this.setState({[nameError]: true})
      this.setState({[nameErrorText]: 'Invalid number'})
    }
    this.handleChange(name)(event)
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
                label="Symbol"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"/>
              <TextField
                label="Exchange"
                className={classes.textField}
                value={this.state.exchange}
                onChange={this.handleChange('exchange')}
                margin="normal"/>
              <TextField
                label="Currency"
                className={classes.textField}
                value={this.state.currency}
                onChange={this.handleChange('currency')}
                margin="normal"/>
              <TextField
                label="Number of shares"
                className={classes.textField}
                value={this.state.shares}
                onChange={this.validateNumber('shares', /^\d+$/)}
                error={this.state.sharesError}
                helperText={this.state.sharesErrorText}
                margin="normal"/>
              <TextField
                label="Book Cost"
                className={classes.textField}
                value={this.state.bookCost}
                onChange={this.validateNumber('bookCost', /^\d+(.[0-9]{0,2})?$/)}
                error={this.state.bookCostError}
                helperText={this.state.bookCostErrorText}
                margin="normal"/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(AddStockForm)
