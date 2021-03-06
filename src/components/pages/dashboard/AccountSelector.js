import React from 'react'
import {FormControl, FormControlLabel, FormGroup, FormLabel, Switch} from '@material-ui/core/es/index'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/es/styles/withStyles'

const styles = {

}

function AccountSelector(props) {

  const handleStateChange = account => () => {
    props.handleChange(account.name, !account.config.dashboard)
  }

  const generateSwitches = () => {
    const labels = []
    props.accounts.forEach(account => {
      labels.push(
        <FormControlLabel
          key={account.name}
          control={
            <Switch checked={account.config.dashboard} onChange={handleStateChange(account)}/>
          }
          label={account.name}
        />
      )
    })
    return labels
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Show stocks from:</FormLabel>
      <FormGroup row={true}>
        {generateSwitches()}
      </FormGroup>
    </FormControl>
  )
}

AccountSelector.propTypes = {
  accounts: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default withStyles(styles)(AccountSelector)
