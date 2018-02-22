import request from 'axios';

export const CHAMPIONSHIP_WINNERS_FETCHED = 'CHAMPIONSHIP_WINNERS_FETCHED';

export const championshipWinnersFetched = (data) => ({
  type: CHAMPIONSHIP_WINNERS_FETCHED,
  payload: data,
});

export default () => {
  return dispatch => {
    request({
      method: 'GET',
      url: `http://ergast.com/api/f1/constructors/ferrari/constructorStandings/1/drivers`,
      responseType: 'json',
    })
      .then((res) => {
        console.log(res);
        debugger
        dispatch(championshipWinnersFetched(res.data));
      })
      .catch(console.warn);
  }
}
