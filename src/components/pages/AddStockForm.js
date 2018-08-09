import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  TextField,
  Typography
} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React, {Component} from 'react'

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
    this.setState({open: true})
  }

  handleSubmit = () => {
    console.log(this.state)
    this.props.onSubmit({
      name: this.state.name,
      currency: this.state.currency,
      shares: this.state.shares,
      bookCost: this.state.bookCost
    })
    this.resetState()
  }

  handleChange = name => event => {
    this.setState({
      [ name ]: event.target.value
    })
  }

  validateNumber = (name, format) => event => {
    this.setState({[ name ]: event.target.value})
    const nameError = `${name}Error`
    const nameErrorText = `${name}ErrorText`
    if (event.target.value.match(format)) {
      this.setState({[ nameError ]: false})
      this.setState({[ nameErrorText ]: undefined})
    } else {
      this.setState({[ nameError ]: true})
      this.setState({[ nameErrorText ]: 'Invalid number'})
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
          onClose={this.resetState}>
          <DialogContent>
            <Typography variant="subheading">Add to your portfolio</Typography>
            <form className={classes.formContainer}>
              <Grid container item sm={6} justify="center">
                <TextField
                  label="Symbol"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"/>
              </Grid>
              <Grid container item sm={6} justify="center">
                <TextField
                  label="Number of shares"
                  className={classes.textField}
                  value={this.state.shares}
                  onChange={this.validateNumber('shares', /^\d+$/)}
                  error={this.state.sharesError}
                  helperText={this.state.sharesErrorText}
                  margin="normal"/>
              </Grid>
              <Grid container item sm={6} justify="center">
                <TextField
                  label="Book Cost"
                  className={classes.textField}
                  value={this.state.bookCost}
                  onChange={this.validateNumber('bookCost', /^\d+(.[0-9]{0,2})?$/)}
                  error={this.state.bookCostError}
                  helperText={this.state.bookCostErrorText}
                  margin="normal"/>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetState} color="primary">
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
