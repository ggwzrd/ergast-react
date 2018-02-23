import request from 'axios';

export const RESULTS_FETCHED = 'RESULTS_FETCHED';
export const RACES_SAVED = 'RACES_SAVED';

export const resultsFetched = (winners) => ({
  type: RESULTS_FETCHED,
  payload: winners,
});

export const racesSaved = (races) => ({
  type: RACES_SAVED,
  payload: races,
});

const getWinners = (races) => {
  return races.map((race) =>
    race.Results.reduce((winner, result) => !winner && result.position === '1' ? result.Driver : winner, false), false
  )
}

export default () => {
  return dispatch => {
    for(let o = 0; o <= 2140; o+=300)
      request({
        method: 'GET',
        url: `https://ergast.com/api/f1/constructors/ferrari/results.json?offset=${o}&limit=300`,
        responseType: 'json',
      })
        .then((res) => {
          const data    = res.data.MRData;
          const races   = data.RaceTable.Races
          const winners = getWinners(races);

          dispatch(resultsFetched(winners));
          dispatch(racesSaved(races));
        })
        .catch(console.warn);
  }
};
