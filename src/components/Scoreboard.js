import React, { Component } from 'react';
import { initialState, getGameScore, setScore } from '../scoreboard';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore(playerNumber) {
    const newState = setScore(playerNumber, this.state);
    this.setState(() => newState);
  }

  render() {
    const { scoreCall, winningPlayer } = getGameScore(this.state.gamePoints);
    return (
      <div>
        <h1>Tennis Scoreboard</h1>
        <h2 id="score">Score: {scoreCall}</h2>
        <button
          className="player1-scores"
          type="button" onClick={() => this.updateScore(1)}
          disabled={winningPlayer}
        >
          Player 1 scores
        </button>
        <button
          className="player2-scores"
          type="button"
          onClick={() => this.updateScore(2)}
          disabled={winningPlayer}
        >
          Player 2 scores
        </button>
        <button
          className="reset"
          type="button"
          onClick={() => this.setState(() => initialState)}
        >
          Start over
        </button>
      </div>
    );
  };
}

export default Scoreboard;
