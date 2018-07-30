import React from 'react';
import ListItemIcon from '@material-ui/core/es/ListItemIcon/ListItemIcon';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import Icon from '@material-ui/core/es/Icon/Icon';
import {Link} from "react-router-dom";

export class SideMenuList extends React.Component {

  render() {
    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <Icon>dashboard</Icon>
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
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
      </div>
    );
  }
}