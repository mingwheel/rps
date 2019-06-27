function init() {
  let rounds = 5;
  let playerScore = 0;
  let computerScore = 0;
  const choices = document.querySelectorAll("#player i");

  choices.forEach(c => {
    c.addEventListener("click", () => {
      const playerSelection = c.classList[0];
      const computerSelection = computerPlay();
      console.log(playerSelection, computerSelection);

      game(playerSelection, computerSelection);
      console.log(`Scores: ${playerScore}, ${computerScore}`);
    });
  });

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
    return (p[a] === p[b]) ? 0 // Draw
                            : ((p[a] - p[b] + 3) % 3 === 1) ? 1 // Win
                            : -1; // Lose
  }

  function game(player, computer) {
    if (playerScore === rounds || computerScore === rounds) return;
    const result = playRound(player, computer);
    if (result === 0) {
      console.log('draw');
    } else if (result > 0) {
      console.log('win');
      playerScore++;
    } else { 
      console.log('lose'); 
      computerScore++; 
    }
  }
}

