// Import the expect function from Chai
var expect = chai.expect;

// Describe the Deck class and the shuffleDeck method
describe('Deck', function () {
    // Describe the shuffleDeck method
    describe('#shuffleDeck', function () {
        // Specify what the test should do
        it('should shuffle the deck', function () {
            // Create a new deck
            const deck = new Deck();

            // Create a copy of the original order of cards
            const originalOrder = [...deck.cards];

            // Shuffle the deck
            deck.shuffleDeck();

            // Use Chai's expect function to assert that the shuffled deck is not deep equal to the original order
            expect(deck.cards).to.not.deep.equal(originalOrder);
        });
    });
});
