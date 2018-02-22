import React from 'react';
import PropTypes from 'prop-types';

class DriversOverview extends React.Component {
  constructor(props, context) {
    super(props, context);


  }

  componentDidMount() {
    const { fetchDrivers, } = this.props;

    fetchDrivers();
  }

  componentDidUpdate() {
    const { drivers, } = this.props;

    console.log(drivers);
  }

  render() {
    return (
      <div  className="drivers-overview-container">

      </div>
    )
  }
};

DriversOverview.propTypes = {
  drivers: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  fetchDrivers: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  fetchChampionshipWinners: PropTypes.func.isRequired,
};

export default DriversOverview;
