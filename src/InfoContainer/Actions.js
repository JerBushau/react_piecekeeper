import React from 'react';
import PropTypes from 'prop-types';

const Actions = props =>
  <div className="actions">
    <div tabIndex="0"
         className="accumulate-button"
         onClick={ e => props.handleAccumulation(e) } >accumulate</div>
    <div className="add-space-button"
         onClick={ () => props.toggleAddSpaceDropdown() }>add space
      <div className="add-space-dropdown hidden">
        <button className="add-sheep"
                onClick={ () => props.handleAddSpace('sheep') }>Sheep</button>
        <button className="add-boar"
                onClick={ () => props.handleAddSpace('boar') }>Pig</button>
        <button className="add-cow"
                onClick={ () => props.handleAddSpace('cow') }>Cow</button>
        <button className="add-stone"
                onClick={ () => props.handleAddSpace('stone') }>Stone</button>
      </div>
    </div>
  </div>;

  Actions.propTypes = {
    handleAccumulation: PropTypes.func.isRequired,
    toggleAddSpaceDropdown: PropTypes.func.isRequired,
    handleAddSpace: PropTypes.func.isRequired
  }

export default Actions;
