import React, {Component} from 'react'
import {NativeSelect} from '@material-ui/core/es/index'
import PropTypes from 'prop-types'

export class AccountSelector extends Component {

  render() {
    return (
      <NativeSelect
        value={this.props.accountSelection}
        onChange={this.props.changeDisplay}>
        {this.props.generateDisplayDropdown()}
      </NativeSelect>
    )
  }
}

AccountSelector.propTypes = {
  accountSelection: PropTypes.string.isRequired,
  changeDisplay: PropTypes.func.isRequired,
  generateDisplayDropdown: PropTypes.func.isRequired
}
