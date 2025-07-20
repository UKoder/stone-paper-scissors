let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    let computerMove = pickComputerMove();
    let user = document.querySelector(".js-userMove");
    user.innerHTML = `<img src='imgs/stone.png' class='js-move-img'>`;
    result("stone", computerMove);
  } else if (event.key === "p") {
    let computerMove = pickComputerMove();
    let user = document.querySelector(".js-userMove");
    user.innerHTML = `<img src='imgs/paper.png' class='js-move-img'>`;
    result("paper", computerMove);
  } else {
    let computerMove = pickComputerMove();
    let user = document.querySelector(".js-userMove");
    user.innerHTML = `<img src='imgs/scissors.png' class='js-move-img'>`;
    result("scissors", computerMove);
  }
});

document.querySelector(".js-user-stone").addEventListener("click", () => {
  let computerMove = pickComputerMove();
  let user = document.querySelector(".js-userMove");
  user.innerHTML = `<img src='imgs/stone.png' class='js-move-img'>`;
  result("stone", computerMove);
});

document.querySelector(".js-user-paper").addEventListener("click", () => {
  let computerMove = pickComputerMove();
  let user = document.querySelector(".js-userMove");
  user.innerHTML = `<img src='imgs/paper.png' class='js-move-img'>`;
  result("paper", computerMove);
});

document.querySelector(".js-user-scissors").addEventListener("click", () => {
  let computerMove = pickComputerMove();
  let user = document.querySelector(".js-userMove");
  user.innerHTML = `<img src='imgs/scissors.png' class='js-move-img'>`;
  result("scissors", computerMove);
});

document.querySelector(".js-reset-btn").addEventListener("click", () => {
  resetScore();
});

document.querySelector(".js-autoPlayBtn").addEventListener("click", () => {
  autoPlay();
});

function pickComputerMove() {
  let computerMove = Math.random();
  if (computerMove >= 0 && computerMove < 1 / 3) computerMove = "stone";
  else if (computerMove >= 1 / 3 && computerMove < 2 / 3)
    computerMove = "paper";
  else computerMove = "scissors";
  let compMove = document.querySelector(".js-compMove");
  compMove.innerHTML = `<img src="imgs/${computerMove.toLowerCase()}.png" alt="${computerMove}" class="js-move-img">`;
  return computerMove;
}
let finalResult = document.querySelector(".js-result");
function result(userMove, computerMove) {
  if (computerMove === "stone") {
    if (userMove === "stone") {
      finalResult.innerHTML = "You Tied!";
      score.ties += 1;
    } else if (userMove === "paper") {
      finalResult.innerHTML = "You Win!";
      score.wins += 1;
    } else {
      finalResult.innerHTML = "You Lost!";
      score.losses += 1;
    }
  } else if (computerMove === "paper") {
    if (userMove === "stone") {
      finalResult.innerHTML = "You Lost!";
      score.losses += 1;
    } else if (userMove === "paper") {
      finalResult.innerHTML = "You Tied!";
      score.ties += 1;
    } else {
      finalResult.innerHTML = "You Win!";
      score.wins += 1;
    }
  } else {
    if (userMove === "stone") {
      finalResult.innerHTML = "You Win!";
      score.wins += 1;
    } else if (userMove === "paper") {
      finalResult.innerHTML = "You Lost!";
      score.losses += 1;
    } else {
      finalResult.innerHTML = "You Tied!";
      score.ties += 1;
    }
  }
  let scores = document.querySelector(".js-score");
  scores.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  localStorage.setItem("score", JSON.stringify(score));
}
function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  localStorage.removeItem("score");
  document.querySelector(".js-score").innerHTML = "-";
  document.querySelector(".js-userMove").innerHTML = "-";
  document.querySelector(".js-compMove").innerHTML = "-";
  document.querySelector(".js-result").innerHTML = "-";
}

play = false;
function autoPlay() {
  if (!play) {
    document.querySelector(".js-autoPlayBtn").innerHTML = "Stop Play";
    intervalID = setInterval(() => {
      let comp1 = pickComputerMove();
      let comp2 = pickComputerMove();
      result(comp1, comp2);
      let autoplayComp = document.querySelector(".js-userMove");
      autoplayComp.innerHTML = `<img src='imgs/${comp1}.png' class='js-move-img'>`;
    }, 1000);
    play = true;
  } else {
    document.querySelector(".js-autoPlayBtn").innerHTML = "Auto Play";
    clearInterval(intervalID);
    play = false;
  }
}
