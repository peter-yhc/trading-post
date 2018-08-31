import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ContentContainer from './ContentContainer'
import NavigationFrame from './NavigationFrame'

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  }
}

class BaseLayout extends React.Component {

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <NavigationFrame/>
        <ContentContainer/>
      </div>
    )
  }
}

BaseLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(BaseLayout)