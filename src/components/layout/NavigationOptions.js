import React from 'react'
import ListItem from '@material-ui/core/es/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/es/ListItemIcon/ListItemIcon'
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText'
import Icon from '@material-ui/core/es/Icon/Icon'
import {Link} from 'react-router-dom'
import withStyles from '@material-ui/core/es/styles/withStyles'

const styles = {
  Link: {
    textDecoration: 'none',
    color: "inherit"
  }
}

class NavigationOptions extends React.Component {

  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <ListItem button>
          <ListItemIcon>
            <Icon>dashboard</Icon>
          </ListItemIcon>
          <ListItemText>
            <Link className={classes.Link} to="/">Dashboard</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon>assessment</Icon>
          </ListItemIcon>
          <ListItemText>Performance</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon>assignment</Icon>
          </ListItemIcon>
          <ListItemText>
            <Link className={classes.Link} to="/portfolio">Portfolio</Link>
          </ListItemText>
        </ListItem>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NavigationOptions)