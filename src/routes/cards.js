const express = require('express');
const router = express.Router();
const controller = require('../controllers/cardsController');

router.get('/', controller.listCards);
router.get('/:id', controller.getCard);
router.post('/', controller.createCard);
router.delete('/:id', controller.deleteCard);

module.exports = router;
