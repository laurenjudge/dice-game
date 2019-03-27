let scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

/**********************************************
*** Set Winning Score 
**********************************************/
document.querySelector('.btn-points').addEventListener('click', winningScoreFun)

function winningScoreFun() {
    let displayScore = document.getElementById('winning-score');
    winningScore = document.querySelector('.winning-input').value;
    
    if (winningScore < 20 || winningScore > 500) {
        displayScore.textContent = 'Winning Score must be a number between 20 - 500';
        gamePlaying = false; 
    } else if (isNaN(winningScore)) {
        displayScore.textContent = winningScore + ' is not a number.';
        gamePlaying = false;
    } else 
        displayScore.textContent = 'Winning Score: ' + winningScore;
}

/**********************************************
*** Roll The Dice Button
**********************************************/

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random number 
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result 
        document.querySelector('.dice-container').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was not a 1 or a second 6
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else 
            nextPlayer();
    }
});

/**********************************************
*** Hold the Score Button
**********************************************/

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false; 
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-container').style.display = 'none';
            //Add Winner CSS style
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else
            nextPlayer();
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Removing/adding CSS classes
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

/**********************************************
*** New Game
**********************************************/

document.querySelector('.btn-new').addEventListener('click', init);

//ititialisation of the game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; 
    gamePlaying = true;
    winningScore = document.querySelector('.winning-input').value;

    document.querySelector('.dice-container').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Remove the 'Winner' 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //Remove the class bc if it's not removed, the class will duplicate
    document.querySelector('.player-0-panel').classList.add('active');
}

