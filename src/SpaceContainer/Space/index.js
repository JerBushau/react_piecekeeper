import React from 'react';
import PropTypes from 'prop-types';


const Space = props =>
  <div className={ "space " + props.sp.type }
       onClick={ (e) => props.gather(e, props.sp.id) }>
    {/*<small className="prev-value">{props.sp.previousValue}</small>
    <button className="delete-button">X</button>*/}
    <h1 className="name">{props.sp.name}</h1>
    <h1 className="number">{props.sp.accumulatedAmount}</h1>
    <h3 className="type">{props.sp.type}</h3>
  </div>;

Space.propTypes = {
  gather: PropTypes.func.isRequired,
  sp: PropTypes.object.isRequired
};

export default Space;
