import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

// material-ui
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';

// components
import Navbar from './Navbar';

// icons
import VictoryIcon from '../trophy.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '64px auto 0',
  },
  gridList: {
    width: '1024px',
    height: '100vh',
  },
  subheader: {
    width: '100%',
  },
   badge: {
     position: 'absolute',
     top: '15px',
     left: '10px',
   },
   tile: {
    position: 'relative',
  },

  rootTop: {
    background:
    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class DriversOverview extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        highlighted: '',
    }

    this.getSize         = this.getSize.bind(this);
    this.handleHiglight  = this.handleHiglight.bind(this);
    this.highlightDriver = this.highlightDriver.bind(this);
  }

  componentDidMount() {
    const { fetchDrivers, } = this.props;

    fetchDrivers();
  }

  componentDidUpdate(prevProps) {
    const {
      drivers,
      fetchResults,
      fetchChampionshipWinners,
    } = this.props;

    if (prevProps.drivers.length !== drivers.length) {
      fetchResults();
      fetchChampionshipWinners();
    }

  }

  handleHiglight = highlighted => () => this.setState({
    highlighted: this.state.highlighted !== highlighted ? highlighted : null,
  });

  getSize(victories) {
    // if (victories > 10)
    //   return 3;
    // if (victories > 5)
    //   return 2;

    return 1;
  }

  highlightDriver(driver) {
    const { highlighted, } = this.state;

    switch (highlighted) {
      case 'winners':
        return driver.worldChampion ? 'highlighted' : 'fade-out';

      case 'loosers':
        return driver.victories === 0 ? 'highlighted loosers' : 'fade-out';

      default: return ''
    }
  }

  render() {
    const { drivers, classes, loading, } = this.props;
    const { highlighted, } = this.state;

    return (
      <div  className="drivers-overview-container">
        <Navbar handleHiglight={this.handleHiglight} highlighted={highlighted}/>
        <div className={classes.root}>
          {loading ?
            <CircularProgress size={15} />

            : <GridList cellHeight={200} className={classes.gridList} cols={3}>
            {drivers.map(driver => (
              <GridListTile
                className={ClassNames(classes.tile, this.highlightDriver(driver))}
                key={driver.driverId}
                cols={this.getSize(driver.victories)}
                rows={(this.getSize(driver.victories) - 1) || 1}
              >
                <img src={`https://source.unsplash.com/${this.getSize(driver.victories) * 300}x${this.getSize(driver.victories) * 200}/?${driver.familyName},ferrari,car`} alt={driver.name} />
                <GridListTileBar
                  className={classes.rootTop}
                  title={`${driver.givenName} ${driver.familyName}`}
                  subtitle={<span>{driver.nationality}</span>}
                  titlePosition="top"
                  actionIcon={loading ?
                    <IconButton className={classes.icon}>
                      <CircularProgress size={40} />
                    </IconButton>
                    : null}
                />
                <Badge
                  className={classes.badge}
                  badgeContent={typeof driver.victories === 'number' ? driver.victories : <CircularProgress size={15} />}
                  color="secondary">

                  <img src={VictoryIcon} className="trophy" alt={`${driver.familyName} victories`}/>
                </Badge>
              </GridListTile>
            ))}
          </GridList>}
        </div>
      </div>
    )
  }
};

DriversOverview.propTypes = {
  loading: PropTypes.bool.isRequired,
  drivers: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  fetchDrivers: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  fetchChampionshipWinners: PropTypes.func.isRequired,
};

export default withStyles(styles)(DriversOverview);
