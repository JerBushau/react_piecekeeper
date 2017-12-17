import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import InfoContainer from './InfoContainer';
import SpaceContainer from './SpaceContainer';

class App extends Component {
  state = {
    dropdownActive: false,
    editing: false,
    isHavestRound: false,
    // could generate these based off one object
    activeSpaces: [
      { id: 0, previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'wood', name: 'Copse' },
      { id: 1, previousAmount: 0, defaultAmount: 2, accumulatedAmount: 2, type: 'wood', name: 'Grove' },
      { id: 2, previousAmount: 0, defaultAmount: 3, accumulatedAmount: 3, type: 'wood', name: 'Forest' },
      { id: 3, previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'clay', name: 'Clay Pit' },
      { id: 4, previousAmount: 0, defaultAmount: 2, accumulatedAmount: 2, type: 'clay', name: 'Hollow' },
      { id: 5, previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'reed', name: 'Reed Bank' },
      { id: 6, previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'food', name: 'Fishing' },
      { id: 7, previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'food', name: 'Traveling Players' }
    ],
    // same obj could be used here
    randomOrderSpaces: [
      { previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'sheep', name: 'Sheep' },
      { previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'cow', name: 'Cattle' },
      { previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'boar', name: 'Pig' },
      { previousAmount: 0, defaultAmount: 1, accumulatedAmount: 1, type: 'stone', name: 'Stone Quarry' }
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
    this.state.randomOrderSpaces.find(sp => {
      if (type === sp.type) {
        return space = Object.assign({}, sp)
      }
      return false
    });
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
    let currentRound = e.shiftKey ? (this.state.roundInfo.currentRound - 1)
                                  : (this.state.roundInfo.currentRound + 1);
    if (currentRound >= 15 || currentRound <= -1) return
    let stage = this.getStage(currentRound);
    let message = this.getMessage(currentRound);

    this.setState({
      activeSpaces: this.state.activeSpaces.map(space => {
        let accumulatedAmount = !e.shiftKey ? (space.accumulatedAmount + space.defaultAmount)
                                            : (space.accumulatedAmount - space.defaultAmount);
        if (accumulatedAmount <= 0) accumulatedAmount = 0;
        return {
          ...space,
          accumulatedAmount: accumulatedAmount,
          previousAmount: accumulatedAmount
        }
      }),
      isHavestRound: (message !== ''),
      roundInfo: {
        ...this.state.roundInfo,
        currentRound: currentRound,
        currentStage: stage,
        message: message
      }
    });
  }

  spaceClickHandler = (e, id) => {
    if (e.ctrlKey) return this.toggleEditing();
    if (e.target.tagName === 'BUTTON') {
      return this.removeSpaceAt(id);
    }
    this.setState({
      activeSpaces: this.state.activeSpaces.map(space => {
        if (space.id === id) {
          let amount = e.shiftKey ? space.accumulatedAmount + 1: 0;
          return {
            ...space,
            accumulatedAmount: amount
          }
        }
        return space
      })
    });
  }

  getMessage = currentRound => {
    let message;
    this.state.roundInfo.harvestRounds.find(round => {
      if (round === Number(currentRound)) {
        (round === 14) ? message = 'Last Harvest!'
                       : message = 'Harvest this round!';
        return message
      }
      message = '';
    });
    return message
  }

  getStage = currentRound => {
    let stage = 0;
    let roundStageMap = { "11": 5, "9": 4, "7": 3, "4": 2, "0": 1 }
    for (let key in roundStageMap) {
      if (currentRound > Number(key)) {
        (currentRound === 14) ? stage = 6
                              : stage = roundStageMap[key];
      }
    }
    return stage
  }

  toggleProp = prop =>
    this.setState({[prop]: !this.state[prop] })

  toggleEditing = () =>
    this.toggleProp('editing')

  toggleDropdown = () =>
    this.toggleProp('dropdownActive')

  removeSpaceAt = id =>
    this.setState({
      activeSpaces: this.state.activeSpaces.filter(space => id !== space.id)
    })

  render() {
    return (
      <div className="App wrapper">
        <Header />
        <InfoContainer toggleAddSpaceDropdown={ this.toggleAddSpaceDropdown }
                       roundInfo={ this.state.roundInfo }
                       handleAccumulation={ this.handleAccumulation }
                       handleAddSpace={ this.handleAddSpace }
                       toggleDropdown={ this.toggleDropdown }
                       dropdownActive={ this.state.dropdownActive }
                       isHarvestRound={ this.state.isHavestRound } />
        <SpaceContainer activeSpaces={ this.state.activeSpaces }
                        spaceClickHandler={ this.spaceClickHandler }
                        editing={ this.state.editing } />
      </div>
    )
  }
}

export default App;
