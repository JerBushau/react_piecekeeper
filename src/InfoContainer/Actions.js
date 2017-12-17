import React from 'react';
import PropTypes from 'prop-types';

import AddSpaceDropdown from './AddSpaceDropdown';

const Actions = props =>
  <div className="actions">
    <div tabIndex="0"
         className="accumulate-button"
         onClick={ e => props.handleAccumulation(e) } >accumulate</div>
    <AddSpaceDropdown toggleDropdown={ props.toggleDropdown }
                      dropdownActive={ props.dropdownActive }
                      handleAddSpace={ props.handleAddSpace } />
  </div>;

  Actions.propTypes = {
    handleAccumulation: PropTypes.func.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    dropdownActive: PropTypes.bool.isRequired,
    handleAddSpace: PropTypes.func.isRequired
  }

export default Actions;
