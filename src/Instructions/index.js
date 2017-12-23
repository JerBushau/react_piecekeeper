import React from 'react';
import PropTypes from 'prop-types';

const Instructions = props => 
  <div className={ "instruction-toggle " + (props.instructionsActive ? 'active' : '' ) }
       onClick={ () => props.toggleInstructions() } > 
    { props.instructionsActive ? 'X' : '?' }
    <div className={ "instructions " + (props.instructionsActive ? '' : 'hidden') } >
      <h1>Agricola Piecekeeper</h1>
      <p>Saves time and game pieces.</p>
      <ul>
        <li className="instruction-title">Basic Functions</li>
        <li>click on a space to gather resources</li>
        <li>click the accumulate button to accumulate resourses</li>
        <li className="instruction-title">Corrections and Bonuses</li>
        <li><code>shift+click</code> on the accumulate button to roll back one round</li>
        <li><code>shift+click</code> on any space to increment that space by one for bonuses or to fix mistakes</li>
        <ul>
          <li className="instruction-title">Editing Mode</li>
          <li><code>ctrl+click</code> on any space to enter editing options.</li>
          <li>The green box in the left corner is the value of the space for the current round, click it to set the current value of the space to this value.</li>
          <li>The red box, which only shows up on the spaces that you have added to the board, allows you to remove these spaces from the board.</li>
        </ul>
      </ul>
    </div>
  </div>;

Instructions.propTypes = {
  instructionsActive: PropTypes.bool.isRequired,
  toggleInstructions: PropTypes.func.isRequired
}

export default Instructions;
