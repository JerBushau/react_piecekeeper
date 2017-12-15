import React from 'react';

import logo from '../imgs/agricola.png';

const Header = props =>
  <header>
      <div className="logo">
        <img src={ logo } alt="agricola logo" />
      </div>
      <h3 className="site-title">Piecekeeper</h3>
  </header>;

export default Header;
