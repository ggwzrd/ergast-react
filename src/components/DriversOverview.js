import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100vw',
    height: '100vh',
  },
  subheader: {
    width: '100%',
  },
});

class DriversOverview extends React.Component {
  constructor(props, context) {
    super(props, context);


  }

  componentDidMount() {
    const { fetchDrivers, } = this.props;

    fetchDrivers();
  }

  componentDidUpdate() {
    const { drivers, } = this.props;

    console.log(drivers);
  }

  render() {
    const { drivers, classes, } = this.props;
    // https://source.unsplash.com/collection/887947/
    return (
      <div  className="drivers-overview-container">
        <div className={classes.root}>
          <GridList cellHeight={360} className={classes.gridList} cols={3}>
            {drivers.map(driver => (
              <GridListTile key={driver.driverId} cols={driver.wins || 1}>
                <img src={`https://source.unsplash.com/300x200/?ferrari,${driver.familyName}`} alt={driver.name} />
                <GridListTileBar
                  title={`${driver.familyName} ${driver.givenName}`}
                  subtitle={<span>{driver.nationality}</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
};

DriversOverview.propTypes = {
  drivers: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  fetchDrivers: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  fetchChampionshipWinners: PropTypes.func.isRequired,
};

export default withStyles(styles)(DriversOverview);
