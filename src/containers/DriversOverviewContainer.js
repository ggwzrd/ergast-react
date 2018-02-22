import { connect, } from 'react-redux';

// actions
import fetchDrivers from '../actions/fetch-drivers';
import fetchResults from '../actions/fetch-results';
import fetchChampionshipWinners from '../actions/fetch-championship-winners';

// connected component
import DriversOverview from '../components/DriversOverview';

const mapStateToProps = state => ({
  loading: state.loading,
  drivers: state.drivers.all,
  total: state.drivers.total,
  offset: state.drivers.offset,
});

export default connect(mapStateToProps, {
  fetchDrivers,
  fetchResults,
  fetchChampionshipWinners,
})(DriversOverview);
