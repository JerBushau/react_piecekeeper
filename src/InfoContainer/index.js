import React from 'react';
import PropTypes from 'prop-types';

import RoundInfo from './RoundInfo';
import Actions from './Actions';

const InfoContainer = props =>
  <nav>
    <RoundInfo roundInfo={ props.roundInfo } />
    <Actions toggleDropdown={ props.toggleDropdown }
             dropdownActive={ props.dropdownActive }
             handleAccumulation={ props.handleAccumulation }
             handleAddSpace={ props.handleAddSpace } />
  </nav>;

InfoContainer.propTypes = {
  roundInfo: PropTypes.object.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  dropdownActive: PropTypes.bool.isRequired,
  handleAccumulation: PropTypes.func.isRequired,
  handleAddSpace: PropTypes.func.isRequired
}

export default InfoContainer;
