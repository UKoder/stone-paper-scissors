let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

document.querySelector(
  ".js-score"
).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    play("stone");
  } else if (event.key === "p") {
    play("paper");
  } else if (event.key === "s") {
    play("scissors");
  } else if (event.key === "Backspace") {
    confirm();
  } else if (event.key === "a") {
    autoPlay();
  }
});

document.querySelector(".js-user-stone").addEventListener("click", () => {
  play("stone");
});

document.querySelector(".js-user-paper").addEventListener("click", () => {
  play("paper");
});

document.querySelector(".js-user-scissors").addEventListener("click", () => {
  play("scissors");
});

document.querySelector(".js-reset-btn").addEventListener("click", () => {
  confirm();
});

document.querySelector(".js-autoPlayBtn").addEventListener("click", () => {
  autoPlay();
});

function play(userMove) {
  let user = document.querySelector(".js-userMove");
  user.innerHTML = `<img src='imgs/${userMove}.png' class='js-move-img'>`;
  let computerMove = pickComputerMove();
  result(userMove, computerMove);
}

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

let isAutoPlay = false;
function autoPlay() {
  if (!isAutoPlay) {
    document.querySelector(".js-autoPlayBtn").innerHTML = "Stop Play";
    intervalID = setInterval(() => {
      let comp1 = pickComputerMove();
      let comp2 = pickComputerMove();
      result(comp1, comp2);
      let autoplayComp = document.querySelector(".js-userMove");
      autoplayComp.innerHTML = `<img src='imgs/${comp1}.png' class='js-move-img'>`;
    }, 1000);
    isAutoPlay = true;
  } else {
    document.querySelector(".js-autoPlayBtn").innerHTML = "Auto Play";
    clearInterval(intervalID);
    isAutoPlay = false;
  }
}

function confirm() {
  let confirmBox = document.querySelector(".js-confirm");
  confirmBox.classList.remove("hidden");
  document.querySelector(".js-confirm-yes").addEventListener("click", () => {
    resetScore();
    confirmBox.classList.add("hidden");
  });
  document.querySelector("body").addEventListener("keydown", (event) => {
    if (event.key === "y") {
      resetScore();
      confirmBox.classList.add("hidden");
    }
  });
  document.querySelector(".js-confirm-no").addEventListener("click", () => {
    confirmBox.classList.add("hidden");
  });
  document.querySelector("body").addEventListener("keydown", (event) => {
    if (event.key === "n") {
      confirmBox.classList.add("hidden");
    }
  });
}
