## Cards REST API

Simple Express.js REST API for managing an in-memory playing card collection.

### Endpoints

| Method | Endpoint   | Description         | Body (JSON)                              |
|--------|------------|---------------------|-------------------------------------------|
| GET    | /cards     | List all cards      |                                           |
| GET    | /cards/:id | Get a card by ID    |                                           |
| POST   | /cards     | Create a new card   | { "suit": "Hearts", "value": "Ace" }    |
| DELETE | /cards/:id | Delete a card by ID |                                           |

### Validation
* suit must be one of: Hearts, Spades, Diamonds, Clubs
* value must be one of: Ace, King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2

### Project Structure
```
EXP 2/
  package.json
  src/
    app.js
    server.js
    data/cardsData.js
    controllers/cardsController.js
    routes/cards.js
    middleware/errorHandler.js
  test/
    cards.test.js
```

### Quick Start
```bash
cd "EXP 2"
npm install
npm run dev   # http://localhost:3000
```

### Example Requests (curl)
```bash
curl http://localhost:3000/cards

curl -X POST http://localhost:3000/cards \
  -H 'Content-Type: application/json' \
  -d '{"suit":"Clubs","value":"Jack"}'

curl http://localhost:3000/cards/2

curl -X DELETE http://localhost:3000/cards/1
```

### Run Tests
```bash
npm test
```

### Notes
Data is in-memory and resets on server restart.
