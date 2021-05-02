/* ===================== VARIABLES ===================== */

const players = [
  {
    card: document.querySelector('.player--0'),
    totalScoreField: document.getElementById('score--0'),
    currentScoreField: document.getElementById('current--0'),
    totalScore: 0,
    currentScore: 0,
  },
  {
    card: document.querySelector('.player--1'),
    totalScoreField: document.getElementById('score--1'),
    currentScoreField: document.getElementById('current--1'),
    totalScore: 0,
    currentScore: 0,
  },
];

// buttons

const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

// dice

const dice = document.querySelector('.dice');
dice.classList.add('hidden');

// who's playing

let player1 = true;

/* ===================== HELPER FUNCTIONS ===================== */

// generate random number
const randomNum = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

// disable or enable roll and hold buttons

const disableOrEnableButtons = (bool) => {
  roll.disabled = bool;
  hold.disabled = bool;
  if (bool) {
    dice.classList.add('hidden');
  } else {
    dice.classList.remove('hidden');
    dice.src = `images/pig-game/dice-0.png`;
  }
};

// reset all scores and styles

const resetAll = () => {
  // reset points for all players
  players.forEach((player) => {
    player.totalScore = 0;
    player.currentScore = 0;
    player.totalScoreField.textContent = player.totalScore;
    player.currentScoreField.textContent = player.currentScore;

    // check if player contains player--winner class, remove it if so
    if (player.card.classList.contains('player--winner'))
      player.card.classList.remove('player--winner');
  });
  player1 = true;
};

// change dice image when dice number changes
const changeImg = (num) => {
  dice.src = `images/pig-game/dice-${num}.png`;
};

// reset these when player rolls 1:
const playerEnd = (player) => {
  players[player].currentScore = 0;
  players[player].currentScoreField.textContent = players[player].currentScore;

  if (player1) {
    player1 = false;
    players[player].card.classList.remove('player--active');
    players[1].card.classList.add('player--active');
  } else {
    player1 = true;
    players[player].card.classList.remove('player--active');
    players[0].card.classList.add('player--active');
  }
};

// if player rolls other than 1, add points
const playerPoints = (player, points) => {
  players[player].currentScore += points;
  players[player].currentScoreField.textContent = players[player].currentScore;
};

// save points on hold, other player turn
const saveTotal = (player) => {
  players[player].totalScore += players[player].currentScore;
  players[player].totalScoreField.textContent = players[player].totalScore;
  // check if total poins is 100 or more. If so, player wins the game
  if (players[player].totalScore >= 100) {
    console.log(player + 'won');
    players[player].card.classList.add('player--winner');
    players[player].currentScoreField.textContent = 'winner!';
    disableOrEnableButtons(true);
  } else {
    players[player].currentScoreField.textContent = 0;
  }
  players[player].currentScore = 0;
};

/* ===================== GAME ===================== */

// start new game, reset all settings
const startNew = () => {
  disableOrEnableButtons(false);
  resetAll();
};

// roll the dice funtion
const rollTheDice = () => {
  // genereate number, change image, show the dice
  let num = randomNum();
  changeImg(num);
  dice.classList.remove('hidden');
  //   if num === 1 player looses
  if (num === 1) {
    player1 ? playerEnd(0) : playerEnd(1);
    // if num !== 1 player gets points
  } else {
    player1 ? playerPoints(0, num) : playerPoints(1, num);
  }
};

const holdGame = () => {
  if (player1) {
    // save points, change styling and active player
    saveTotal(0);
    player1 = false;
    players[1].card.classList.add('player--active');
    players[0].card.classList.remove('player--active');
  } else {
    saveTotal(1);
    player1 = true;
    players[0].card.classList.add('player--active');
    players[1].card.classList.remove('player--active');
  }
};

// event listeners
newGame.addEventListener('click', startNew);
roll.addEventListener('click', rollTheDice);
hold.addEventListener('click', holdGame);
