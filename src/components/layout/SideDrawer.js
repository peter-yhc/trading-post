import React, {Component} from 'react';
import {Divider, Drawer} from '@material-ui/core';
import withStyles from '@material-ui/core/es/styles/withStyles';
import {SideMenuList} from './SideMenuList';

const drawerWidth = 300;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

class SideDrawer extends Component {

  render() {
    const {classes} = this.props;

    return (
      <Drawer variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}>
        <div className={classes.toolbar}/>
        <Divider/>
        <SideMenuList/>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideDrawer);