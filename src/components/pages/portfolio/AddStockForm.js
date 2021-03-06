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
import {DecimalField, IntegerField} from '../../common'

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
    width: 200
  }
})

function getDefaultState() {
  return {
    open: false,
    error: false,
    errorText: undefined,
    symbol: '',
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
    this.props.onSubmit({
      symbol: this.state.symbol.toUpperCase(),
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
        <Dialog open={this.state.open} onClose={this.resetState}>
          <DialogContent>
            <Typography variant="subtitle1">Add to your portfolio</Typography>
            <form className={classes.formContainer}>
              <Grid container item sm={6} justify="center">
                <TextField
                  label="Symbol"
                  className={classes.textField}
                  value={this.state.symbol}
                  onChange={this.handleChange('symbol')}
                  helperText="Eg. MSFT, VCN.TO, JNJ"
                  margin="normal"/>
              </Grid>
              <Grid container item sm={6} justify="center">
                <IntegerField
                  label={'Number of shares'}
                  value={this.state.shares}
                  handleChange={this.handleChange('shares')}
                  helperText="The number of shares you currently own"
                />
              </Grid>
              <Grid container item sm={6} justify="center">
                <DecimalField
                  label={'Book Cost'}
                  value={this.state.bookCost}
                  handleChange={this.handleChange('bookCost')}
                  helperText="The book cost of your shares"
                />
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetState} color="primary"> Cancel </Button>
            <Button onClick={this.handleSubmit} color="primary"> Add </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(AddStockForm)
