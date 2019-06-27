function init() {
  const choices = document.querySelectorAll("#player i");
  choices.forEach(c => {
    c.addEventListener("click", () => {
      const playerSelection = c.classList[0];
      const computerSelection = computerPlay();
      console.log(playerSelection, computerSelection);

      const result = playRound(playerSelection, computerSelection);
      console.log(result);
    });
  });
}

function computerPlay() {
  plays = ['rock', 'paper', 'scissors'];
  return plays[Math.floor(Math.random() * 3)];
}

function playRound(a, b) {
  const p = {
    rock: 0,
    paper: 1,
    scissors: 2
  }
  return (p[a] === p[b]) ? 'Draw'
                    : ((p[a] - p[b] + 3) % 3 === 1) ? 'You win!'
                                                    : 'You lose!';
}