let score = JSON.parse(localStorage.getItem('score')) ||
{
    wins: 0,
    losses: 0,
    ties: 0
};

function pickComputerMove(){
    let computerMove=Math.random();
    if (computerMove>=0 && computerMove<(1/3))
        computerMove='Stone';
    else if (computerMove >= (1/3) && computerMove<(2/3))
        computerMove='Paper';
    else
        computerMove='Scissors';
    let compMove=document.querySelector('.js-compMove');
    compMove.innerHTML = `<img src="imgs/${computerMove.toLowerCase()}.png" alt="${computerMove}" class="js-move-img">`;
    return computerMove;
}
let finalResult=document.querySelector('.js-result');
function result(userMove,computerMove){
    if (computerMove === 'stone'){
        if (userMove === 'stone'){
            finalResult.innerHTML='You Tied!';
            score.ties+=1;
        }
        else if (userMove === 'paper'){
            finalResult.innerHTML='You Win!';
            score.wins+=1;
        }
        else{
            finalResult.innerHTML='You Lost!';
            score.losses+=1;
        }
    }
    else if (computerMove === 'paper'){
        if (userMove==='stone'){
            finalResult.innerHTML='You Lost!';
            score.losses+=1;
        }
        else if (userMove==='paper'){
            finalResult.innerHTML='You Tied!';
            score.ties+=1;
        }
        else{
            finalResult.innerHTML='You Win!';
            score.wins+=1;
        }
    }
    else{
        if (userMove==='stone'){
            finalResult.innerHTML='You Win!';
            score.wins+=1;
        }
        else if (userMove==='paper'){
            finalResult.innerHTML='You Lost!';
            score.losses+=1;
        }
        else{
            finalResult.innerHTML='You Tied!';
            score.ties+=1;
        }
    }
    let scores = document.querySelector('.js-score');
    scores.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    localStorage.setItem('score', JSON.stringify(score));
}
function resetScore(){
    score = {
            wins: 0,
            losses: 0,
            ties: 0
        }
    localStorage.removeItem('score');
    document.querySelector('.js-score').innerHTML = '-';
    document.querySelector('.js-userMove').innerHTML = '-';
    document.querySelector('.js-compMove').innerHTML = '-';
    document.querySelector('.js-result').innerHTML = '-';
}