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
      url: 'http://ergast.com/api/f1/constructors/ferrari/drivers.json?limit=300',
      responseType: 'json',
    })
      .then((res) => {
        const data = res.data.MRData
        dispatch(driverFetched({
          total: parseInt(data.total, 10),
          limit: parseInt(data.limit, 10),
          offset: parseInt(data.offset, 10),
          all: data.DriverTable.Drivers,
        }))
      })
      .catch(console.warn);
  }
}
