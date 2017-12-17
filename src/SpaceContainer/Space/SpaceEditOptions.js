import React from 'react';
import PropTypes from 'prop-types';

const SpaceEditOptions = props =>
  <div className="editing-options">
    <small className="prev-value">{ props.sp.previousAmount }</small>
    { props.sp.id > 7
      ? <button className="delete-button">&#215;</button>
      : '' }
  </div>;

SpaceEditOptions.propTypes = {
  sp: PropTypes.object.isRequired
};

export default SpaceEditOptions;
