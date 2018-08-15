import {Grid, Typography} from '@material-ui/core/es/index'
import PropTypes from 'prop-types'
import React from 'react'
import {Line} from 'react-chartjs-2'

export function StockTimeSeriesChart(props) {

  const chartData = {
    labels: props.labels,
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ]
      }
    ]
  }

  const chartOptions = {
    maintainAspectRatio: true
  }

  return (
    <React.Fragment>
      <Grid container alignItems="center" direction="column">
        <Typography variant="subheading">{props.title}</Typography>
        <Line data={chartData} options={chartOptions} width={100} height={50}/>
      </Grid>
    </React.Fragment>
  )
}

StockTimeSeriesChart.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}
