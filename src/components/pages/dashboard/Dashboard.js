import {Grid, NativeSelect} from '@material-ui/core/es/index'
import React, {Component} from 'react'
import {Line} from 'react-chartjs'
import {withRouter} from 'react-router-dom'

class Dashboard extends Component {

  chartData = {
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' ],
    datasets: [
      {
        label: 'My First dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [ 65, 59, 80, 81, 56, 55, 40 ]
      },
      {
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [ 28, 48, 40, 19, 86, 27, 90 ]
      }
    ]
  }

  chartOptions = {
  }

  render() {
    return (
      <React.Fragment>
        <Grid container item sm={12} justify="center">
          <Line data={this.chartData} options={this.chartOptions} width="600" height="250"/>
        </Grid>
        <NativeSelect
          id="stock-name-selector">
          <option key="GOOG" value="GOOG">GOOG</option>
          <option key="VCN.TO" value="VCN.TO">VCN.TO</option>
          <option key="AAPL" value="AAPL">AAPL</option>
          <option key="XAW.TO" value="XAW.TO">XAW.TO</option>
        </NativeSelect>
      </React.Fragment>
    )
  }
}

export default withRouter(Dashboard)
