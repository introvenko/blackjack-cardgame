let playerHand = 0;
let computerHand = 0;
let gameActive = false;

const cards = document.querySelectorAll('.cards img');
const startGameButton = document.getElementById('start-game');
const drawCardButton = document.getElementById('draw-card');
const stopGameButton = document.getElementById('stop-game');
const playerCards = document.getElementById('player-cards');
const message = document.getElementById('message');

// Function to start a game
startGameButton.addEventListener('click', function() {
    gameActive = true;
    playerHand = 0;
    computerHand = 0;
    playerCards.innerHTML = '';
    message.innerHTML = '';
    drawCardButton.style.display = 'block';
    stopGameButton.style.display = 'block';
    startGameButton.style.display = 'none';
});

// Function to draw a card
drawCardButton.addEventListener('click', function() {
    if (gameActive) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const selectedCard = cards[randomIndex];

        const cardValue = parseInt(selectedCard.getAttribute('data-value'));
        playerHand += cardValue;

        const cardImage = document.createElement('img');
        cardImage.src = selectedCard.src;
        cardImage.alt = selectedCard.alt;
        cardImage.style.display = 'inline-block';
        playerCards.appendChild(cardImage);

        if (playerHand > 21) {
            endGame(`Bust! You have ${playerHand}. You lose!`);
        } else if (playerHand === 21) {
            endGame(`Blackjack! You have ${playerHand}. You win!`);
        } else {
            message.textContent = `You drew a card worth ${cardValue}. Your total is now ${playerHand}.`;
        }
    }
});

stopGameButton.addEventListener('click', function() {
    if (gameActive) {
        playComputerHand();
    }
});

function playComputerHand() {
    while (computerHand < 17) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const selectedCard = cards[randomIndex];
        const cardValue = parseInt(selectedCard.getAttribute('data-value'));
        computerHand += cardValue;
    }

    let resultMessage;
    if (playerHand > 21) {
        resultMessage = `Bust! You have ${playerHand}. You lose!`;
    } else if (computerHand > 21) {
        resultMessage = `Someone busts with ${computerHand}. You win!`;
    } else if (playerHand === computerHand) {
        resultMessage = `It's a tie! Both you and the someone have ${playerHand}.`;
    } else if (playerHand > computerHand) {
        resultMessage = `You win with ${playerHand} against someone's ${computerHand}!`;
    } else {
        resultMessage = `Someone wins with ${computerHand} against your ${playerHand}.`;
    }

    endGame(resultMessage);
}

function endGame(resultMessage) {
    message.textContent = resultMessage;
    gameActive = false;
    drawCardButton.style.display = 'none';
    stopGameButton.style.display = 'none';
    startGameButton.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    cards.forEach(card => {
        card.style.display = 'none';
    });
});