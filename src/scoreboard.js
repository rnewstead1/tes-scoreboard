export const initialState = {
  gamePoints: {
    player1: 0,
    player2: 0,
  },
};

export function setScore(playerNumber, previousState) {
  const otherPlayer = playerNumber === 1 ? 'player2': 'player1';
  if (previousState.gamePoints[otherPlayer] === 4) {
    return {
      gamePoints: {
        player1: 3,
        player2: 3
      },
    }
  }
  return {
    gamePoints: Object.assign({}, previousState.gamePoints, {
      [`player${playerNumber}`]: previousState.gamePoints[`player${playerNumber}`] + 1
    })
  };
}

const scores = {
  0: 'love',
  1: '15',
  2: '30',
  3: '40'
}

function regularScoreCall(player1, player2) {
  return player1 === player2 ? `${scores[player1]}-all` : `${scores[player1]}-${scores[player2]}`;
}

function advantageScoreCall(player1) {
  return player1 === 4 ? 'Advantage, player1' : 'Advantage, player2';
}

function isAdvantage(player1, player2) {
  return player1 !== player2 && player1 >= 3 && player2 >=3;
}

function isGame(player1, player2) {
  return (player1 >= 4 && player1 > (player2 + 1)) || (player2 >= 4 && player2 > (player1 + 1));
}

function gameScore(player1, player2) {
  return player1 > player2 ? {
    scoreCall: 'Game, player1',
    winningPlayer: 'player1'
  } : {
    scoreCall: 'Game, player2',
    winningPlayer: 'player2'
  }
}

export function getGameScore(gamePoints) {
  const { player1, player2 } = gamePoints;
  if (isGame(player1, player2)) return gameScore(player1, player2);
  return {
    scoreCall: isAdvantage(player1, player2) ? advantageScoreCall(player1) : regularScoreCall(player1, player2),
    winningPlayer: null,
  }
}
