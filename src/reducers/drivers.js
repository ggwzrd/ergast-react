import { DRIVER_FETCHED, } from '../actions/fetch-drivers';
import { CHAMPIONSHIP_WINNERS_FETCHED, } from '../actions/fetch-championship-winners';
import { RESULTS_FETCHED, } from '../actions/fetch-results';

const INITIAL_STATE =  {
  total: 0,
  limit: 0,
  offset: 0,
  all: [],
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {

  switch (type) {
    // using Object assign for avoid the mutation of the state
    case DRIVER_FETCHED: return Object.assign({}, state, { ...payload, });

    default: return state;
  }
}
