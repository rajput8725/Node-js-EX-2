// Initial in-memory card data
const cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
  { id: 3, suit: 'Diamonds', value: 'Queen' }
];

let nextId = cards.length + 1;

function generateId() {
  return nextId++;
}

module.exports = { cards, generateId };
