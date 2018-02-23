import { DRIVER_FETCHED, } from '../actions/fetch-drivers';
import { CHAMPIONSHIP_WINNERS_FETCHED, } from '../actions/fetch-championship-winners';
import { RESULTS_FETCHED, RACES_SAVED, } from '../actions/fetch-results';

const INITIAL_STATE =  {
  total: 0,
  limit: 0,
  offset: 0,
  races: [],
  all: [],
};

const updateWinners = (state, winners) => {
  const drivers        = state.all;

  // map through the drivers and assign to each of them the respective victories
  const updatedDrivers = drivers.map((driver) => Object.assign({}, driver, {
    victories: (driver.victories || 0) + assignWins(driver.driverId, winners),
  }))

  return Object.assign({}, state, { all: updatedDrivers})
};

// loop though all the winners count only the ones gained from the current driver
const assignWins = (id, winners) => {
  return winners.reduce((victories, driver) => driver.driverId === id ? victories + 1 : victories, 0);
};

// identify the word champions
const assignChampionships = (state, champions) => {
  const drivers        = state.all

  // champions is a list of strings with driversIds
  const updatedDrivers = drivers.map((driver) =>
    Object.assign({}, driver, {
      worldChampion: champions.indexOf(driver.driverId) !== -1
    })
  );

  return Object.assign({}, state, { all: updatedDrivers, });
};

const assignJoinedDate =  (drivers, races) => {
  const driversFound = [];

  const found = races.map((race) => {
    const seasonYear = parseInt(race.season, 10);

    // exclude all the races that happened before 1993
    // if (seasonYear < 1993) return false;

    const driver = race.Results[0].Driver;

    // exclude race if driver join date has been already found
    if (driversFound.indexOf(driver.driverId) !== -1) return false;

    // add to found drivers
    driversFound.push(driver.driverId);
    const currentDriver = selectDriver(drivers, driver.driverId);

    return Object.assign({}, currentDriver, { joinedDate: seasonYear, });
  }).filter((driver) => driver);
  // filtering the excluded reces and getting the updated drivers

  return drivers.map((driver) => {
    const selectedDriver = selectDriver(found, driver.driverId);

    if (!selectedDriver) return driver;

    return selectedDriver;
  });
};


// select a specific drivers
const selectDriver = (drivers, id) => {
  return drivers.reduce((found, driver) => !found && driver.driverId === id ? driver : found, false)
}

// actions reducer for drivers
export default (state = INITIAL_STATE, { type, payload } = {}) => {

  switch (type) {
    // using Object assign for avoid the mutation of the state
    case DRIVER_FETCHED: return Object.assign({}, state, { ...payload, });

    // update drivers with the data of the winners
    case RESULTS_FETCHED: return updateWinners(state, payload);

    // assign championships to respective world champions
    case CHAMPIONSHIP_WINNERS_FETCHED: return assignChampionships(state, payload);

    // saving all the races and add joined date of each driver to the constructor
    case RACES_SAVED: return Object.assign({}, state, {
      races: [].concat(state.races, payload),
      all: assignJoinedDate(state.all, payload)
    });

    default: return state;
  }
}
