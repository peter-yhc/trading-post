import React from 'react'
import {ChartIntervalEnum as CHART} from './StockTimeSeriesChart'
import {NativeSelect} from '@material-ui/core/es/index'
import PropTypes from 'prop-types'

export function TimePeriodSlider(props) {

  const handleChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <NativeSelect
      value={props.value}
      onChange={handleChange}>
      <option value={CHART.MONTH}>1 Month</option>
      <option value={CHART.HALF_YEAR}>6 Months</option>
      <option value={CHART.YEAR}>1 Year</option>
      <option value={CHART.FIVE_YEARS}>5 Years</option>
    </NativeSelect>

    // <Slider/>
  )

}

TimePeriodSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}
