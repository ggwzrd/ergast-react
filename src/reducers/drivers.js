import { DRIVER_FETCHED, } from '../actions/fetch-drivers';
import { CHAMPIONSHIP_WINNERS_FETCHED, } from '../actions/fetch-championship-winners';
import { RESULTS_FETCHED, } from '../actions/fetch-results';

const INITIAL_STATE =  {
  total: 0,
  limit: 0,
  offset: 0,
  all: [],
};

const updateWinners = (state, winners) => {
  const drivers        = state.all;

  // map through the drivers and assign to each of them the respective victories
  const updatedDrivers = drivers.map((driver) => Object.assign({}, driver, {
    victories: assignWins(driver.driverId, winners)
  }))

  return Object.assign({}, state, { all: updatedDrivers})
}

// loop though all the winners count only the ones gained from the current driver
const assignWins = (id, winners) => {
  return winners.reduce((victories, driver) => driver.driverId === id ? victories + 1 : victories, 0);
}

const assignChampionships = (state, champions) => {
  const drivers        = state.all
  const updatedDrivers = drivers.map((driver) =>
    Object.assign({}, driver, {
      wordChampion: champions.indexOf(driver.driverId) >= 0
    })
  );
  
  return Object.assign({}, state, { all: updatedDrivers, });
}

export default (state = INITIAL_STATE, { type, payload } = {}) => {

  switch (type) {
    // using Object assign for avoid the mutation of the state
    case DRIVER_FETCHED: return Object.assign({}, state, { ...payload, });

    // update drivers with the data of the winners
    case RESULTS_FETCHED: return updateWinners(state, payload);

    case CHAMPIONSHIP_WINNERS_FETCHED: return assignChampionships(state, payload);

    default: return state;
  }
}
