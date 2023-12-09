// Define the Card class representing a playing card
class Card {
    constructor(rank, suit) {
        this.rank = rank; // Rank of the card (e.g., '2', '3', 'K')
        this.suit = suit; // Suit of the card (e.g., 'Hearts', 'Clubs')
    }
}

// Define the Deck class representing a deck of cards
class Deck {
    constructor() {
        this.cards = []; // Array to store the deck of cards
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

        this.initializeDeck();
        this.shuffleDeck();
    }

    // Method to initialize the deck with 52 cards
    initializeDeck() {
        this.ranks.forEach(rank => {
            this.suits.forEach(suit => {
                this.cards.push(new Card(rank, suit));
            });
        });
    }

    // Method to shuffle the deck
    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Method to deal a card from the deck
    dealCard() {
        return this.cards.pop();
    }
}

// Define the Player class representing a player in the game
class Player {
    constructor(name) {
        this.name = name; // Player's name
        this.points = 0; // Player's points
        this.hand = []; // Array to store the player's hand of cards
    }

    // Method for a player to play a card
    playCard() {
        return this.hand.pop();
    }

    // Method to receive a card into the player's hand
    receiveCard(card) {
        this.hand.unshift(card);
    }

    // Method to increase the player's points
    increasePoints() {
        this.points++;
    }
}

// Define the CardGame class representing the WAR card game
class CardGame {
    constructor(player1Name, player2Name) {
        this.deck = new Deck(); // Create a deck for the game
        this.players = [new Player(player1Name), new Player(player2Name)]; // Create two players
    }

    // Method to play a round of the game
    playRound() {
        const card1 = this.players[0].playCard();
        const card2 = this.players[1].playCard();

        console.log(`${this.players[0].name} plays ${card1.rank} of ${card1.suit}`);
        console.log(`${this.players[1].name} plays ${card2.rank} of ${card2.suit}`);

        // Compare the ranks of the played cards and award points accordingly
        if (card1.rank > card2.rank) {
            this.players[0].increasePoints();
            console.log(`${this.players[0].name} wins the round!`);
        } else if (card1.rank < card2.rank) {
            this.players[1].increasePoints();
            console.log(`${this.players[1].name} wins the round!`);
        } else {
            console.log('It\'s a tie!');
        }
    }

    // Method to play the entire game
    playGame() {
        // Deal 26 cards to each player
        for (let i = 0; i < 26; i++) {
            this.players[0].receiveCard(this.deck.dealCard());
            this.players[1].receiveCard(this.deck.dealCard());
        }

        // Iterate through turns where each player plays a card
        for (let i = 0; i < 26; i++) {
            this.playRound();
        }

        // Display the score after all cards have been played
        this.displayScore();

        // Declare the winner
        this.declareWinner();
    }

    // Method to display the score
    displayScore() {
        console.log(`${this.players[0].name}: ${this.players[0].points} points`);
        console.log(`${this.players[1].name}: ${this.players[1].points} points`);
    }

    // Method to declare the winner
    declareWinner() {
        if (this.players[0].points > this.players[1].points) {
            console.log(`${this.players[0].name} wins the game!`);
        } else if (this.players[0].points < this.players[1].points) {
            console.log(`${this.players[1].name} wins the game!`);
        } else {
            console.log('It\'s a tie!');
        }
    }

}

// Create an instance of CardGame and start playing
const cardGame = new CardGame('Player 1', 'Player 2');
cardGame.playGame();

// Export modules for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Card, Deck, Player, CardGame };
}

// Only create an instance and start playing if not running tests
if (typeof module === 'undefined' || !module.parent) {
    const cardGame = new CardGame('Player 1', 'Player 2');
    cardGame.playGame();
}
