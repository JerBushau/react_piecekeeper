import React from 'react';
import PropTypes from 'prop-types';


const RoundInfo = props =>
  <div className={ 'round-info-container ' +
                   (props.roundInfo.isHarvestRound ? 'alert ' : '') +
                   ((props.roundInfo.currentRound === 14) ? 'alert-final ' : '') }>
    <div className="round-info">
      <h1>Round: { props.roundInfo.currentRound }</h1>
      <h1>Stage: { props.roundInfo.currentStage }</h1>
    </div>
    <h1 className="message">{ props.roundInfo.message }</h1>
  </div>

RoundInfo.propTypes = {
  roundInfo: PropTypes.object.isRequired,
  isHarvestRound: PropTypes.bool.isRequired
}

export default RoundInfo;
