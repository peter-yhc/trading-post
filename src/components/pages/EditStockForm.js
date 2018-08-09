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
  formControl: {
    marginBottom: '8px'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '500px'
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
    open: false
  }
}

class EditStockForm extends Component {

  state = getDefaultState()

  handleClickOpen = () => {
    this.setState({open: true})
  }

  resetState = () => {
    this.setState({open: false})
  }

  createSelectOptions = () => {
    const options = []
    this.props.data.forEach(stock => {
      options.push(
        <option key={stock.name} value={stock.name}>{stock.name}</option>
      )
    })
    return options
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
        <Dialog
          className={classes.root}
          open={this.state.open}
          onClose={this.resetState}>
          <DialogContent>
            <Typography variant="subheading">Edit portfolio</Typography>
            <form className={classes.formContainer}>
              <Grid container item sm={6} justify="center" alignItems="flex-end">
                <FormControl
                  className={classes.formControl}>
                  <InputLabel htmlFor="stock-name-selector">Name</InputLabel>
                  <NativeSelect
                    id="stock-name-selector"
                    className={classes.select}
                    inputProps={{name: 'name'}}>
                    {this.createSelectOptions()}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid container item sm={6} justify="center" alignItems="flex-end">
                <TextField
                  label="Number of shares"
                  className={classes.textField}
                  margin="normal"/>
              </Grid>

              <Grid container item sm={6} justify="center">
                <TextField
                  label="Book Cost"
                  className={classes.textField}
                  margin="normal"/>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.resetState}>
              Cancel
            </Button>
            <Button color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(EditStockForm)
