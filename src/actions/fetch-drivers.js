import request from 'axios';

export const DRIVER_FETCHED = 'DRIVER_FETCHED';

export const driverFetched = (data) => ({
  type: DRIVER_FETCHED,
  payload: data,
});

export default () => {
  return dispatch => {
    request({
      method: 'GET',
      url: `http://ergast.com/api/f1/constructors/ferrari/drivers.json`,
      responseType: 'json',
    })
      .then((res) => {
        const data = res.data.MRData
        dispatch(driverFetched({
          total: parseInt(data.total),
          limit: parseInt(data.limit),
          offset: parseInt(data.offset),
          all: data.DriverTable.Drivers,
        }))
      })
      .catch(console.warn);
  }
}
