import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles, } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import { FormControlLabel, } from 'material-ui/Form';

// styles
const styles = {
  root: {
    justifyContent: 'space-between',
  }
}

class Navbar extends React.Component {
  render() {
    const { handleHiglight, highlighted, classes, } = this.props;

    return (
      <AppBar position="fixed" color="default" >
        <Toolbar className={classes.root}>
          <Typography variant="title" color="inherit">
            Ferrari Drivers
          </Typography>
          <div className="right-buttons">
            <FormControlLabel
              value="winners"
              control={<Radio
                checked={highlighted === 'winners'}
                onClick={handleHiglight('winners')}
                value="winners"
                name="winners"
                aria-label="Word Champions"
              />}
              label="Word Champions"
            />

            <FormControlLabel
              value="loosers"
              control={<Radio
                checked={highlighted === 'loosers'}
                onClick={handleHiglight('loosers')}
                value="loosers"
                name="loosers"
                aria-label="Loosers"
              />}
              label="Loosers"
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.defaultProps = {
  highlighted: '',
}

Navbar.propTypes = {
  handleHiglight: PropTypes.func.isRequired,
  highlighted: PropTypes.string,
}

export default withStyles(styles)(Navbar);
