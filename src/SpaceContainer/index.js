import React from 'react';
import PropTypes from 'prop-types';

import Space from './Space';


const SpaceContainer = props =>
  <section className="space-container">
    { props.activeSpaces.map(sp =>
      <Space key={ sp.id }
             sp={ sp }
             gather={ props.gather } />) }
  </section>;


SpaceContainer.propTypes = {
  activeSpaces: PropTypes.array.isRequired,
  gather: PropTypes.func.isRequired
};

export default SpaceContainer;
