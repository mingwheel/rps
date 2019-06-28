const game = {
  rounds: 5,
  scores: [0, 0], // [computer, player]
  options: {
    rock: 0,
    paper: 1,
    scissors: 2
  },
  isRunning: false,
  hasEnded: false,

  init() {
    const playerChoices = document.querySelectorAll("#player i");
    const computerChoices = document.querySelectorAll("#computer i");
    const scores = document.querySelectorAll(".score");

    playerChoices.forEach(choice => {
      choice.onmouseover = () => { if (!game.isRunning) choice.classList.add("fas") };
      choice.onmouseout = () => { if (!game.isRunning) choice.classList.remove("fas") };


      choice.addEventListener("click", function () {
        if (game.isRunning) return;

        game.isRunning = true;
        const playerSelection = game.options[this.classList[0]];
        const computerSelection = game.computerPlay();

        const result = game.match(playerSelection, computerSelection);
        if (result) game.updateScores(result, scores);
        game.updateDisplay(this, computerChoices[computerSelection], result);

      });
    });
  },

  match(player, computer) {
    if (game.hasEnded) return;

    const result = playRound(player, computer);
    if (!result) return;
    else if (result > 0) game.scores[1]++;
    else game.scores[0]++;

    if (game.scores.includes(game.rounds)) {
      game.hasEnded = true;
    }

    return result;

    function playRound(a, b) {
      // Return 0 = draw, 1 = win, -1 = lose
      return (a === b) ? 0
        : ((a - b + 3) % 3) === 1 ? 1
          : -1;
    }
  },

  reset() {
    game.playerScore = game.computerScore = 0;
    game.init();
  },

  updateScores(winner, scores) {
    if (winner < 0) winner = 0;

    scores[winner].style.opacity = 0;
    setTimeout(() => {
      scores[winner].textContent = game.scores[winner];
      scores[winner].style.opacity = 1;
    }, 300);
  },

  updateDisplay(player, computer, result) {
    const resultDisplay = document.querySelector("h1");
    if (game.hasEnded) {
      outcome = (game.scores.indexOf(game.rounds) > 0) ? 'win' : 'lose'
      resultDisplay.textContent = `You ${outcome}!`
    }

    if (!result) {
      player.classList.add('draw');
      computer.classList.add('draw');
    } else if (result > 0) {
      player.classList.add('win');
      computer.classList.add('lose');
    } else {
      player.classList.add('lose');
      computer.classList.add('win');
    }
    player.classList.add('fas');
    computer.classList.add('fas');

    window.setTimeout(() => {
      player.classList.remove('fas', 'draw', 'win', 'lose');
      computer.classList.remove('fas', 'draw', 'win', 'lose');
      game.isRunning = false;
    }, 1000);
  },

  computerPlay() {
    return Math.floor(Math.random() * 3);
  },
}