import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles, } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import IconButton from 'material-ui/IconButton';
import { FormControlLabel, } from 'material-ui/Form';
import Tooltip from 'material-ui/Tooltip';

// material-ui icons
import FiltersIcon from 'material-ui-icons/FilterList';

// styles
import './Navbar.css';

const styles = {
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '50px',
    height: '50px',
    backgroundColor: '#424242',
  },
  menuButton: {
    marginLeft: -12,
  },
}

class Navbar extends React.Component {
  render() {
    const { handleHiglight, highlighted, classes, toggleFilters, } = this.props;

    return (
      <AppBar position="fixed" color="primary" className="navbar">
        <Toolbar className={classes.root}>
          <div className="title-container">
            <Tooltip id="tooltip-filters" title="Filters" placement="bottom">
              <IconButton
                onClick={toggleFilters(true)}
                className={classes.menuButton}
                color="primary"
                aria-label="Filters">
                <FiltersIcon />
              </IconButton>
            </Tooltip>

            <Typography
              variant="title"
              color="primary"
              style={{ display: 'inline-block', }}
            >
              Ferrari Drivers
            </Typography>
          </div>
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
  toggleFilters: PropTypes.func.isRequired,
}

export default withStyles(styles)(Navbar);
