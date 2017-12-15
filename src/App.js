import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import InfoContainer from './InfoContainer';
import SpaceContainer from './SpaceContainer';

class App extends Component {
  state = {
    id: 8,

    activeSpaces: [
      { id: 0, name: 'Copse', type: 'wood', defaultAmount: 1, accumulatedAmount: 1 },
      { id: 1, name: 'Grove', type: 'wood', defaultAmount: 2, accumulatedAmount: 2 },
      { id: 2, name: 'Forest', type: 'wood', defaultAmount: 3, accumulatedAmount: 3 },
      { id: 3, name: 'Clay Pit', type: 'clay', defaultAmount: 1, accumulatedAmount: 1 },
      { id: 4, name: 'Hollow', type: 'clay', defaultAmount: 2, accumulatedAmount: 2 },
      { id: 5, name: 'Reed Bank', type: 'reed', defaultAmount: 1, accumulatedAmount: 1 },
      { id: 6, name: 'Fishing', type: 'food', defaultAmount: 1, accumulatedAmount: 1 },
      { id: 7, name: 'Traveling Players', type: 'food', defaultAmount: 1, accumulatedAmount: 1 }
    ],

    randomOrderSpaces: [
      { name: 'Sheep', type: 'sheep', defaultAmount: 1, accumulatedAmount: 1 },
      { name: 'Cattle', type: 'cow', defaultAmount: 1, accumulatedAmount: 1 },
      { name: 'Pig', type: 'boar', defaultAmount: 1, accumulatedAmount: 1 },
      { name: 'Stone Quarry', type: 'stone', defaultAmount: 1, accumulatedAmount: 1 }
    ],

    roundInfo: {
      harvestRounds: [4, 7, 9, 11, 13, 14],
      currentRound: 1,
      currentStage: 1,
      message: ''
    }
  }

  handleAddSpace = type => {
    let space;
    if (type === 'sheep') {
      space = Object.assign({}, this.state.randomOrderSpaces[0]);
    } else if (type === 'cow') {
      space = Object.assign({}, this.state.randomOrderSpaces[1]);
    } else if (type === 'boar') {
      space = Object.assign({}, this.state.randomOrderSpaces[2]);
    } else if (type === 'stone') {
      space = Object.assign({}, this.state.randomOrderSpaces[3]);
    }
    space.id = this.state.id;

   this.setState({
      id: this.state.id + 1,
      activeSpaces: [
        ...this.state.activeSpaces,
        space
      ]
    });
  }

  handleAccumulation = e => {
    let stage;
    let message;
    let currentRound = e.shiftKey ? (this.state.roundInfo.currentRound - 1)
                                  : (this.state.roundInfo.currentRound + 1);

    if (currentRound >= 15 || currentRound <= -1) {
      return;
    }

    if (currentRound === 14) {
      stage = 6;
    } else if (currentRound > 11) {
      stage = 5;
    } else if (currentRound > 9) {
      stage = 4;
    } else if (currentRound > 7) {
      stage = 3;
    } else if (currentRound > 4) {
      stage = 2;
    } else {
      stage = 1;
    }

    this.state.roundInfo.harvestRounds.find(round => {
      if (round === Number(currentRound)) {
        if (round === 14) {
          this.roundInfoAppearance(true);
          return message = 'Last Harvest!';
        }
        this.roundInfoAppearance(true);
        return message = 'Harvest this round!';
      }
      this.roundInfoAppearance(false);
      return message = '';
    });

    this.setState({
      activeSpaces: this.state.activeSpaces.map(space => {

        if (!e.shiftKey) {
          let accumulatedAmount = space.accumulatedAmount + space.defaultAmount
          return {
          ...space,
          accumulatedAmount: accumulatedAmount
          }
        }
        let accumulatedAmount = space.accumulatedAmount - space.defaultAmount
        if (accumulatedAmount <= 0) accumulatedAmount = 0;
        return {
          ...space,
          accumulatedAmount: accumulatedAmount
        }
      }),
      roundInfo: {
        ...this.state.roundInfo,
        currentRound: currentRound,
        currentStage: stage,
        message: message
      }
    });
  }

  gather = (e, id) =>
    this.setState({
      activeSpaces: this.state.activeSpaces.map(space => {
        if (space.id === id) {
          if (e.shiftKey) {
            return {
              ...space,
              accumulatedAmount: space.accumulatedAmount + 1
            }
          }
          return {
            ...space,
            accumulatedAmount: 0
          }
        }
        return space
      })
    })

  toggleAddSpaceDropdown = () => {
    let button = document.querySelector('.add-space-button');
    let dropdown = document.querySelector('.add-space-dropdown');
    button.classList.toggle('active');
    dropdown.classList.toggle('hidden');
  }

  roundInfoAppearance = alert => {
    let roundInfoContainer = document.querySelector('.round-info-container');
    if (alert) {
      roundInfoContainer.style.animation = 'pulse 0.4s';
      return roundInfoContainer.style.background = '#f84a19';
    }
    roundInfoContainer.style.animation = 'none';
    roundInfoContainer.style.background = '#6441a5';
  }

  render() {
    return (
      <div className="App wrapper">
        <Header />
        <InfoContainer toggleAddSpaceDropdown={ this.toggleAddSpaceDropdown }
                       roundInfo={ this.state.roundInfo }
                       handleAccumulation={ this.handleAccumulation }
                       handleAddSpace={ this.handleAddSpace } />
        <SpaceContainer activeSpaces={ this.state.activeSpaces }
                        gather={ this.gather } />
      </div>
    );
  }
}

export default App;
