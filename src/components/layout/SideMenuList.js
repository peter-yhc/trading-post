import React from 'react'
import ListItem from '@material-ui/core/es/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/es/ListItemIcon/ListItemIcon'
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText'
import Icon from '@material-ui/core/es/Icon/Icon'
import {Link} from 'react-router-dom'

export class SideMenuList extends React.Component {

  render() {
    return (
      <React.Fragment>
        <ListItem button>
          <ListItemIcon>
            <Icon>dashboard</Icon>
          </ListItemIcon>
          <ListItemText>
            <Link to="/">Dashboard</Link>
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
            <Link to="/portfolio">Portfolio</Link>
          </ListItemText>
        </ListItem>
      </React.Fragment>
    )
  }
}