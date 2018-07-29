import React from 'react';
import ListItemIcon from '@material-ui/core/es/ListItemIcon/ListItemIcon';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import Icon from '@material-ui/core/es/Icon/Icon';

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
      </div>
    );
  }
}