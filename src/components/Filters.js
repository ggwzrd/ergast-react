import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles, } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

// styles
import './Filters.css';

const styles = theme => ({
  paper: {
    maxWidth: '1024px',
    margin: '50px auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: '50%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Filters extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      season: 0,
      name: '',
    };

    this.handleApplyClick = this.handleApplyClick.bind(this);
  }

  renderSeasons() {
    const options = [];
    options.push(<option value="" key={0} />);

    for (let y = 1993; y <= 2018; y ++)
      options.push(<option value={y} key={y}>{y}</option>);

    return options;
  }

  handleChange = name => event => this.setState({
    [name]: event.target.value,
  })

  handleApplyClick() {
    const { name, season, } = this.state;
    const { applyFilters, toggleFilters, } = this.props;

    applyFilters({ name, season, });
    toggleFilters(false);
  }

  render() {
    const { toggleFilters, open,  classes, } = this.props;

    return (
      <Drawer classes={{ paper: classes.paper,
       }} anchor="top" open={open} onClose={toggleFilters(false)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">From Season</InputLabel>
          <Select
            native
            value={this.state.season}
            onChange={this.handleChange('season')}
            input={<Input id="season" />}
          >
            {this.renderSeasons()}
          </Select>
          <FormHelperText>filter the drivers joined from this season</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="name"
            label="Driver name"
            type="search"
            className={classes.textField}
            onChange={this.handleChange('name')}
            margin="normal"
          />
        </FormControl>
        <div className="actions-container">
          <Button variant="raised" color="secondary" onClick={this.handleApplyClick}>
            Apply
          </Button>
        </div>
      </Drawer>
    );
  }
};

Filters.propTypes = {
  open: PropTypes.bool.isRequired,
  applyFilters: PropTypes.func.isRequired,
  toggleFilters: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true, })(Filters);
