import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  NativeSelect,
  Typography
} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {DecimalField, IntegerField} from '../../common'

const styles = theme => ({
  button: {
    marginLeft: '0.2em',
    marginBottom: theme.spacing.unit
  },
  dialogButton: {
    margin: theme.spacing.unit
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  selectForm: {
    marginTop: '24px'
  },
  select: {
    minWidth: 200
  },
  textField: {
    minWidth: 200
  }
})

function getDefaultState() {
  return {
    open: false,
    shares: '',
    bookCost: '',
    name: ''
  }
}

class EditStockForm extends Component {

  constructor(props) {
    super(props)
    this.state = getDefaultState()
  }

  handleClickOpen = () => {
    this.setState({open: true})
    this.setState({symbol: this.props.data[ 0 ].symbol})
  }

  resetState = () => {
    this.setState(getDefaultState())
  }

  createSelectOptions = () => {
    const options = []
    Object.values(this.props.data).forEach(stock => {
      options.push(
        <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
      )
    })
    return options
  }

  handleChange = name => event => {
    this.setState({
      [ name ]: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.onSubmit({
      symbol: this.state.symbol.toUpperCase(),
      shares: this.state.shares,
      bookCost: this.state.bookCost
    })
    this.resetState()
  }

  handleDelete = () => {
    this.props.onDelete({symbol: this.state.symbol.toUpperCase()})
    this.resetState()
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          onClick={this.handleClickOpen}>
          <Icon>edit</Icon>
        </Button>
        <Dialog className={classes.root} open={this.state.open} onClose={this.resetState}>
          <DialogContent>
            <Typography variant="subheading">Edit portfolio</Typography>
            <form className={classes.formContainer}>
              <Grid container item sm={6} justify="center">
                <FormControl
                  className={classes.selectForm}>
                  <InputLabel htmlFor="stock-name-selector">Symbol</InputLabel>
                  <NativeSelect
                    id="stock-name-selector"
                    className={classes.select}
                    onChange={this.handleChange('symbol')}>
                    {this.createSelectOptions()}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid container item sm={6} justify="center"> {/*purposely blank*/} </Grid>
              <Grid container item sm={6} justify="center">
                <FormControl>
                  <IntegerField
                    label="Number of shares"
                    value={this.state.shares}
                    handleChange={this.handleChange('shares')}/>
                </FormControl>
              </Grid>
              <Grid container item sm={6} justify="center">
                <FormControl>
                  <DecimalField
                    label="Book Cost"
                    value={this.state.bookCost}
                    handleChange={this.handleChange('bookCost')}/>
                </FormControl>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Grid direction={'row'} justify={'flex-start'} container item>
              <Button className={classes.dialogButton} onClick={this.handleDelete}> Delete </Button>
            </Grid>
            <Grid direction={'row'} justify={'flex-end'} container item>
              <Button className={classes.dialogButton} color="primary" onClick={this.resetState}> Cancel </Button>
              <Button className={classes.dialogButton} color="primary" onClick={this.handleSubmit}> Update </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

EditStockForm.propTypes = {
  data: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default withStyles(styles)(EditStockForm)
