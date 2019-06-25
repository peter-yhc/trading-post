import {TextField} from '@material-ui/core/es/index'
import withStyles from '@material-ui/core/es/styles/withStyles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class NumberField extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
    if (event.target.value.match(this.props.format)) {
      this.setState({error: false})
      this.setState({errorText: undefined})
    } else {
      this.setState({error: true})
      this.setState({errorText: 'Invalid number'})
    }
    this.props.handleChange(event)
  }

  render() {
    const {classes} = this.props
    return (
      <TextField
        label={this.props.label}
        className={classes.textField}
        value={this.state.value}
        onChange={this.handleChange}
        error={this.state.error}
        helperText={this.state.errorText || this.props.helperText}
        margin="normal"/>
    )
  }
}

NumberField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  format: PropTypes.object.isRequired,
  helperText: PropTypes.string,
}

export default withStyles(styles)(NumberField)
