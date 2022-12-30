(function(){
    let scores, roundScore, activePlayer, isGamePlaying, winningScore;

    init();

    /**********************************************
    *** Set Winning Score 
    **********************************************/
    document.querySelector('.btn-points').addEventListener('click', setWinningScore)

    function setWinningScore() {
        let newScore = document.querySelector('.winning-input').value;
        
        if (newScore < 20 || newScore > 500) {
            document.getElementById('winning-score-message').textContent = 'Winning Score must be a number between 20 - 500';
            isGamePlaying = false; 
        } else {
            winningScore = newScore;
            document.getElementById('winning-score-message').textContent = 'Winning Score: ' + newScore;
        }
    }

    /**********************************************
    *** Roll The Dice Button
    **********************************************/

    document.querySelector('.btn-roll').addEventListener('click', handleRollDice);

    function handleRollDice() {
        if (!isGamePlaying) {
            return
        }
        //1. Random number 
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result 
        document.querySelector('.dice-container').style.opacity = '1';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was not a 1 or a second 6
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else 
            setNextPlayer();
    }

    /**********************************************
    *** Hold the Score Button
    **********************************************/

    document.querySelector('.btn-hold').addEventListener('click', handleHoldScore);

    function handleHoldScore() {
        if (isGamePlaying) {
            // Add current score to global score
            scores[activePlayer] += roundScore

            // Update UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            // Check if player won the game
            if (scores[activePlayer] >= winningScore) {
                isGamePlaying = false; 
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice-container').style.opacity = '0';
                //Add Winner CSS style
                document.getElementById('player-' + activePlayer + '-panel').classList.add('winner');
                document.getElementById('player-' + activePlayer + '-panel').classList.remove('active');
            } else
                setNextPlayer();
        }
    }

    function setNextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //Removing/adding CSS classes
        document.getElementById('player-0-panel').classList.toggle('active');
        document.getElementById('player-1-panel').classList.toggle('active');
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
        isGamePlaying = true;
        winningScore = 30;

        document.querySelector('.dice-container').style.opacity = '0';
        document.getElementById('winning-score-message').textContent = 'Winning Score: ' + winningScore;

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //Remove the 'Winner'
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.getElementById('player-0-panel').classList.remove('winner', 'active');
        document.getElementById('player-1-panel').classList.remove('winner', 'active');
        //Remove the class bc if it's not removed, the class will duplicate
        document.getElementById('player-0-panel').classList.add('active');
    }

    /**********************************************
    *** Modal
    **********************************************/

    const MODAL_ELEMENT = document.getElementById("modal-trigger");

    MODAL_ELEMENT.addEventListener("click", () => {
            const POPUP_MODAL = document.getElementById(MODAL_ELEMENT.dataset.popupTrigger);

            const CLOSE_BUTTON = POPUP_MODAL.getElementsByClassName("modal-close-button")[0];

            POPUP_MODAL.classList.toggle("show-modal");

            CLOSE_BUTTON.addEventListener("click", () => {
            POPUP_MODAL.classList.remove("show-modal");
            });
        });
})();