import React, {Component} from 'react';
import Typography from '@material-ui/core/es/Typography/Typography';
import withStyles from '@material-ui/core/es/styles/withStyles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class MainContent extends Component {

  render() {
    const {classes} = this.props
    return (
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Typography>{'You think water moves fast? You should see ice.'}</Typography>
      </main>
    );
  }
}
MainContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainContent);