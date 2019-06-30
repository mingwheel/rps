const game = {
  rounds: 3,
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
    const scores = [...document.querySelectorAll(".score")];
    const resetButton = document.querySelector("#resetButton");
    const roundSelect = document.querySelector("#rounds");
    const resultDisplay = document.querySelector("h1");

    playerChoices.forEach(choice => {
      choice.onmouseover = () => { if (!game.isRunning) choice.classList.add("fas") };
      choice.onmouseout = () => { if (!game.isRunning) choice.classList.remove("fas") };


      choice.addEventListener("click", function () {
        if (game.isRunning) return;

        game.isRunning = true;
        const playerSelection = game.options[this.classList[0]];
        const computerSelection = game.computerPlay();

        const result = game.match(playerSelection, computerSelection);
        if (result) game.updateScores(scores, result);
        game.updateDisplay(this, computerChoices[computerSelection], result, resultDisplay);
      });
    });

    resetButton.addEventListener("click", game.reset(scores, roundSelect, resultDisplay));
    roundSelect.addEventListener("change", game.reset(scores, roundSelect, resultDisplay));
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

  reset(scores, rounds, resultDisplay) {
    return function () {
      game.hasEnded = false;
      game.rounds = Number(rounds.value);
      game.scores = [0, 0];
      game.updateScores(scores);
      scores.map(score => { score.style.color = "#292C2F" });
      resultDisplay.textContent = "Rock, Paper, Scissors!"
    }
  },

  updateScores(scores, winner) {
    if (winner === undefined) {
      scores.forEach(score => {
        score.style.opacity = 0;
        setTimeout(() => {
          score.textContent = 0;
          score.style.opacity = 1;
        }, 300);
      });
    } else {
      if (winner < 0) winner = 0;
      scores[winner].style.opacity = 0;
      setTimeout(() => {
        scores[winner].textContent = game.scores[winner];
        scores[winner].style.opacity = 1;
        if (game.scores[winner] === game.rounds) {
          scores[winner].style.color = "green";
        }
      }, 300);
    }
  },

  updateDisplay(player, computer, result, resultDisplay) {
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