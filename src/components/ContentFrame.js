import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Header, MainContent, SideDrawer} from './layout';

const styles = {
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  }
};

class ContentFrame extends Component {

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header/>
          <SideDrawer/>
          <MainContent/>
        </div>
      </div>
    );
  }
}

ContentFrame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContentFrame);