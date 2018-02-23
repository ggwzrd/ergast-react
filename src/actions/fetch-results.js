import request from 'axios';

export const RESULTS_FETCHED = 'RESULTS_FETCHED';

export const resultsFetched = (winners) => ({
  type: RESULTS_FETCHED,
  payload: winners,
});

const getWinners = (races) => {
  return races.map((race) => race.Results[0].Driver);
}

export default () => {
  return dispatch => {
    request({
      method: 'GET',
      url: 'https://ergast.com/api/f1/constructors/ferrari/results/1.json?limit=300',
      responseType: 'json',
    })
      .then((res) => {
        const data    = res.data.MRData;
        const races   = data.RaceTable.Races
        const winners = getWinners(races);

        dispatch(resultsFetched(winners));
      })
      .catch(console.warn);
  }
};
