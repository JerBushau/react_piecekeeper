import React from 'react';
import PropTypes from 'prop-types';

import RoundInfo from './RoundInfo';
import Actions from './Actions';

const InfoContainer = props =>
  <nav>
    <RoundInfo roundInfo={ props.roundInfo }/>
    <Actions toggleAddSpaceDropdown={ props.toggleAddSpaceDropdown }
             handleAccumulation={ props.handleAccumulation }
             handleAddSpace={ props.handleAddSpace }/>
  </nav>;

InfoContainer.propTypes = {
  roundInfo: PropTypes.object.isRequired,
  toggleAddSpaceDropdown: PropTypes.func.isRequired,
  handleAccumulation: PropTypes.func.isRequired,
  handleAddSpace: PropTypes.func.isRequired
}

export default InfoContainer;
