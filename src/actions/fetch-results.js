import request from 'axios';

export const RESULTS_FETCHED = 'RESULTS_FETCHED';

export const resultsFetched = (data) => ({
  type: RESULTS_FETCHED,
  payload: data,
});

export default () => {
  return dispatch => {
    request({
      method: 'GET',
      url: `https://ergast.com/api/f1/constructors/ferrari/results/1`,
      responseType: 'json',
    })
      .then((res) => {
        console.log(res);
        debugger
        dispatch(resultsFetched(res.data));
      })
      .catch(console.warn);
  }
};
