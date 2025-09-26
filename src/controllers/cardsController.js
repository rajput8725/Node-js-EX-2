const { cards, generateId } = require('../data/cardsData');

const VALID_SUITS = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const VALID_VALUES = ['Ace', 'King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

function listCards(req, res) {
  res.status(200).json({
    success: true,
    count: cards.length,
    data: cards
  });
}

function getCard(req, res) {
  const id = Number(req.params.id);
  
  // Validate ID is a number
  if (isNaN(id)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid ID format. ID must be a number' 
    });
  }
  
  const card = cards.find(c => c.id === id);
  if (!card) {
    return res.status(404).json({ 
      success: false,
      error: `Card with ID ${id} not found` 
    });
  }
  
  res.status(200).json({
    success: true,
    data: card
  });
}

function createCard(req, res) {
  const { suit, value } = req.body || {};
  
  // Validate required fields
  if (!suit || !value) {
    return res.status(400).json({ 
      success: false,
      error: 'Missing required fields: suit and value are required',
      required: ['suit', 'value']
    });
  }
  
  // Validate suit
  if (!VALID_SUITS.includes(suit)) {
    return res.status(400).json({ 
      success: false,
      error: `Invalid suit '${suit}'`,
      validSuits: VALID_SUITS
    });
  }
  
  // Validate value
  if (!VALID_VALUES.includes(value)) {
    return res.status(400).json({ 
      success: false,
      error: `Invalid value '${value}'`,
      validValues: VALID_VALUES
    });
  }
  
  // Check for duplicate cards
  const existingCard = cards.find(c => c.suit === suit && c.value === value);
  if (existingCard) {
    return res.status(409).json({
      success: false,
      error: `Card ${value} of ${suit} already exists`,
      existingCard: existingCard
    });
  }
  
  const newCard = { id: generateId(), suit, value };
  cards.push(newCard);
  
  res.status(201).json({
    success: true,
    message: 'Card created successfully',
    data: newCard
  });
}

function deleteCard(req, res) {
  const id = Number(req.params.id);
  
  // Validate ID is a number
  if (isNaN(id)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid ID format. ID must be a number' 
    });
  }
  
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ 
      success: false,
      error: `Card with ID ${id} not found` 
    });
  }
  
  const [removed] = cards.splice(index, 1);
  res.status(200).json({ 
    success: true,
    message: `Card with ID ${id} deleted successfully`, 
    data: removed 
  });
}

module.exports = { listCards, getCard, createCard, deleteCard };
