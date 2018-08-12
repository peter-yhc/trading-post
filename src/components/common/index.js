import PropTypes from 'prop-types'
import React from 'react'
import NumberField from './NumberField'

const DECIMAL_FORMAT = /^\d+(\.[0-9]{0,2})?$/
const INTEGER_FORMAT = /^\d+$/

export function DecimalField(props) {
  return (
    <NumberField
      format={DECIMAL_FORMAT}
      label={props.label}
      value={props.value}
      handleChange={props.handleChange}
    />
  )
}

DecimalField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export function IntegerField(props) {
  return (
    <NumberField
      format={INTEGER_FORMAT}
      label={props.label}
      value={props.value}
      handleChange={props.handleChange}
    />
  )
}

IntegerField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}
