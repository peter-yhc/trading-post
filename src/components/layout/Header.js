import React, {Component} from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import Typography from '@material-ui/core/es/Typography/Typography';
import withStyles from '@material-ui/core/es/styles/withStyles';

const drawerWidth = 300;

const styles = {
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  }
};

class Header extends Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);