export const APP_LOADING = 'APP_LOADING';
export const APP_READY = 'APP_READY';

export default loading => ({
  type: loading ? APP_LOADING : APP_READY,
});
