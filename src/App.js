import React, { Component } from 'react';
import './App.css';

import Instructions from './Instructions';
import Header from './Header';
import InfoContainer from './InfoContainer';
import SpaceContainer from './SpaceContainer';

class App extends Component {
  state = {
    instructionsActive: false,
    dropdownActive: false,
    editing: false,
    id: 8,
    // could generate these based off one object
    spaceHistory: [],
    activeSpaces: [
      { id: 0, previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'wood', name: 'Copse' },
      { id: 1, previousAmount: 2, defaultAmount: 2, accumulatedAmount: 2, type: 'wood', name: 'Grove' },
      { id: 2, previousAmount: 3, defaultAmount: 3, accumulatedAmount: 3, type: 'wood', name: 'Forest' },
      { id: 3, previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'clay', name: 'Clay Pit' },
      { id: 4, previousAmount: 2, defaultAmount: 2, accumulatedAmount: 2, type: 'clay', name: 'Hollow' },
      { id: 5, previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'reed', name: 'Reed Bank' },
      { id: 6, previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'food', name: 'Fishing' },
      { id: 7, previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'food', name: 'Traveling Players' }
    ],
    // same obj could be used here
    randomOrderSpaces: [
      { previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'sheep', name: 'Sheep' },
      { previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'cow', name: 'Cattle' },
      { previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'boar', name: 'Pig' },
      { previousAmount: 1, defaultAmount: 1, accumulatedAmount: 1, type: 'stone', name: 'Eastern Quarry' }
    ],
    roundInfo: {
      currentRound: 1,
      currentStage: 1,
      isHarvestRound: false,
      message: ''
    }
  }

  handleAddSpace = type => {
    let model = this.state.randomOrderSpaces.find(sp => (type === sp.type));
    let space = Object.assign({}, model);
    let id = this.state.id;
    let count = 1;
    if (space.type === 'stone') {
      this.state.activeSpaces.forEach(sp => {
        if (type === sp.type) {
          count++
        }
      })
    }
    if (count > 1) space.name = 'Western Quarry';
    if (count > 2) space.name = 'oops...'
    space.id = id;
    id++;
    this.setState({
      id: id,
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
    let harvestRound = this.isHarvestRound(currentRound);
    let currentStage = this.getStage(currentRound);
    let message = this.getMessage(currentRound, harvestRound);

    this.setState({
      activeSpaces: this.state.activeSpaces.map(space => {
        let accumulatedAmount = e.shiftKey
                                ? (space.accumulatedAmount - space.defaultAmount)
                                : (space.accumulatedAmount + space.defaultAmount);
        if (accumulatedAmount <= 0) accumulatedAmount = 0;
        return {
          ...space,
          accumulatedAmount: accumulatedAmount,
          previousAmount: accumulatedAmount
        }
      }),
      spaceHistory: [ ...this.state.spaceHistory, this.state.activeSpaces ],
      roundInfo: {
        currentRound: currentRound,
        currentStage: currentStage,
        isHarvestRound: harvestRound,
        message: message
      }
    });
  }

  // need better name
  editingOptionsClickHandler = (e, id) => {
    if (e.target.className === 'delete-button') {
      return this.removeSpaceAt(id)
    } else if (e.target.className === 'prev-value') {
      this.setState({
        activeSpaces: this.state.activeSpaces.map(space => {
        if (space.id === id) {
          return {
            ...space,
            accumulatedAmount: space.previousAmount
          }
        }
        return space
        })
      })
    }
  }

  // need better name
  spaceClickHandler = (e, id) => {
    let clickedSpace = this.state.activeSpaces.find(space => (space.id === id));
    let amount;

    if (e.target.parentElement.className === 'editing-options') {
      return this.editingOptionsClickHandler(e, id)
    }
    if (e.ctrlKey) return this.toggleEditing();
    e.shiftKey ? amount = clickedSpace.accumulatedAmount + 1
               : amount = 0;
    this.setState({
      activeSpaces: this.state.activeSpaces.map(space => {
        if (space.id === id) {
          return {
            ...space,
            accumulatedAmount: amount
          }
        }
        return space
      })
    });
  }
  isHarvestRound = currentRound => {
    let harvestRounds = [4, 7, 9, 11, 13, 14];

    return harvestRounds.some(round =>
      (round === currentRound))
  }

  getMessage = (currentRound, isHarvestRound) => {
    if (isHarvestRound) {
      return (currentRound === 14) ? 'Last Harvest!'
                                   : 'Harvest this round!';
    }
    return ''
  }

  getStage = currentRound => {
    let roundToStageMap = new Map([[11, 5], [9, 4], [7, 3],[4, 2], [0, 1]]);

    for (let [round, stage] of roundToStageMap) {
      if (currentRound > round) {
        return (currentRound === 14) ? 6 : stage;
      }
    }
    return 0
  }

  toggleProp = prop => this.setState({ [prop]: !this.state[prop] })

  toggleEditing = () => this.toggleProp('editing')

  toggleDropdown = () => this.toggleProp('dropdownActive')

  toggleInstructions = () => this.toggleProp('instructionsActive')

  removeSpaceAt = id => {
    this.setState({
      activeSpaces: this.state.activeSpaces.filter(space => id !== space.id)
    })
  }

  render() {
    return (
      <div className="App wrapper">
        <Instructions toggleInstructions={ this.toggleInstructions }
                      instructionsActive={ this.state.instructionsActive  } />
        <Header />
        <InfoContainer toggleAddSpaceDropdown={ this.toggleAddSpaceDropdown }
                       roundInfo={ this.state.roundInfo }
                       handleAccumulation={ this.handleAccumulation }
                       handleAddSpace={ this.handleAddSpace }
                       toggleDropdown={ this.toggleDropdown }
                       dropdownActive={ this.state.dropdownActive } />
        <SpaceContainer activeSpaces={ this.state.activeSpaces }
                        spaceClickHandler={ this.spaceClickHandler }
                        editing={ this.state.editing } />
      </div>
    )
  }
}

export default App;
