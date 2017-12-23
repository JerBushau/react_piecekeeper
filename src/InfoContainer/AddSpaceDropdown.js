import React from 'react';
import PropTypes from 'prop-types';


const AddSpaceDropdown = props =>
  <div className={ 'add-space-button ' + (props.dropdownActive ? 'active' : '') }
         onClick={ () => props.toggleDropdown() }>add space
      <div className={ 'add-space-dropdown ' + (props.dropdownActive ? '' : 'hidden') }>
        <button className="add-sheep"
                onClick={ () => props.handleAddSpace('sheep') }>Sheep</button>
        <button className="add-boar"
                onClick={ () => props.handleAddSpace('boar') }>Pig</button>
        <button className="add-cow"
                onClick={ () => props.handleAddSpace('cow') }>Cow</button>
        <button className="add-stone"
                onClick={ () => props.handleAddSpace('stone') }>Stone</button>
      </div>
  </div>;

AddSpaceDropdown.propTypes = {
  dropdownActive: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  handleAddSpace: PropTypes.func.isRequired
}

export default AddSpaceDropdown;
