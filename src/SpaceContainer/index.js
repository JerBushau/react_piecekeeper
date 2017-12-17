import React from 'react';
import PropTypes from 'prop-types';

import Space from './Space';


const SpaceContainer = props =>
  <section className="space-container">
    { props.activeSpaces.map(sp =>
      <Space key={ sp.id }
             sp={ sp }
             handleClick={ e => props.spaceClickHandler(e, sp.id) }
             editing={ props.editing } />) }
  </section>;


SpaceContainer.propTypes = {
  activeSpaces: PropTypes.array.isRequired,
  spaceClickHandler: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default SpaceContainer;
