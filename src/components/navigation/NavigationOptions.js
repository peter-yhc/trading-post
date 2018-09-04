import Icon from '@material-ui/core/es/Icon/Icon'
import ListItem from '@material-ui/core/es/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/es/ListItemIcon/ListItemIcon'
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText'
import withStyles from '@material-ui/core/es/styles/withStyles'
import React from 'react'
import {Link} from 'react-router-dom'

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}

class NavigationOptions extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <Link className={classes.link} to={'/dashboard'}>
          <ListItem button>
            <ListItemIcon>
              <Icon>dashboard</Icon>
            </ListItemIcon>
            <ListItemText>
              Dashboard
            </ListItemText>
          </ListItem>
        </Link>
        <Link className={classes.link} to={'/performance'}>
          <ListItem button>
            <ListItemIcon>
              <Icon>assessment</Icon>
            </ListItemIcon>
            <ListItemText>Performance</ListItemText>
          </ListItem>
        </Link>
        <Link className={classes.link} to={'/portfolio'}>
          <ListItem button>
            <ListItemIcon>
              <Icon>assignment</Icon>
            </ListItemIcon>
            <ListItemText>
              Portfolio
            </ListItemText>
          </ListItem>
        </Link>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NavigationOptions)
