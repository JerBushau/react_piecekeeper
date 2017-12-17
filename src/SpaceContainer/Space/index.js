import React from 'react';
import PropTypes from 'prop-types';

import SpaceEditOptions from './SpaceEditOptions';

const Space = props =>
  <div className={ "space " + props.sp.type }
       onClick={ props.handleClick }>
    { props.editing
      ? <SpaceEditOptions sp={ props.sp } />
      : '' }
    <h1 className="name">{props.sp.name}</h1>
    <h1 className="number">{props.sp.accumulatedAmount}</h1>
    <h3 className="type">{props.sp.type}</h3>
  </div>;

Space.propTypes = {
  handleClick: PropTypes.func.isRequired,
  sp: PropTypes.object.isRequired
};

export default Space;
