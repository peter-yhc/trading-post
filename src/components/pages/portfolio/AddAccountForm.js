import React, {Component, Fragment} from 'react'
import {Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography} from '@material-ui/core/es'
import withStyles from '@material-ui/core/es/styles/withStyles'
import PropTypes from 'prop-types'

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
    width: 400
  },
  newAccountButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
})

class AddAccountForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      error: null
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleChange = (event) => {
    if (event.target.value.length < 1) {
      this.setState({ error: 'Name is required.' })
    } else {
      this.setState({ error: null })
    }
    this.setState({ name: event.target.value })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.name.length < 1) {
      this.setState({ error: 'Name is required.' })
      return
    }
    this.props.onSubmit({ name: this.state.name })
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Button className={classes.newAccountButton} onClick={this.handleClickOpen}>
          New Account
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogContent>
            <Typography variant="subheading">Add a new account</Typography>
            <form className={classes.formContainer} onSubmit={this.handleSubmit}>
              <Grid container item sm={12} justify="center">
                <TextField
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange}
                  margin="normal"
                  error={this.state.error}
                />
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}> Cancel </Button>
            <Button color="primary" onClick={this.handleSubmit}> Add </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

AddAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(AddAccountForm)
