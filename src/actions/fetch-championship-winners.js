import request from 'axios';

export const CHAMPIONSHIP_WINNERS_FETCHED = 'CHAMPIONSHIP_WINNERS_FETCHED';

export const championshipWinnersFetched = (championshipWinners) => ({
  type: CHAMPIONSHIP_WINNERS_FETCHED,
  payload: championshipWinners,
});

const getChampionshipWinners = (championships) => {

  return championships.map((championship) => {
    const constructor = championship.DriverStandings[0].Constructors[0].constructorId;
    const driverId    = championship.DriverStandings[0].Driver.driverId;

    return constructor === 'ferrari' ? driverId : false
  }).filter((driver) => driver);
}

export default () => {
  return dispatch => {
    request({
      method: 'GET',
      url: 'http://ergast.com/api/f1/driverStandings/1.json?limit=300',
      responseType: 'json',
    })
      .then((res) => {
        const data                = res.data.MRData;
        const champioships        = data.StandingsTable.StandingsLists
        const championshipWinners = getChampionshipWinners(champioships);

        dispatch(championshipWinnersFetched(championshipWinners));
      })
      .catch(console.warn);
  }
}
