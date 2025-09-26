const express = require('express');
const path = require('path');
const cardsRouter = require('./routes/cards');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for parsing JSON and setting headers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS and security headers
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// API routes
app.use('/cards', cardsRouter);

// Root endpoint - redirect to interface
app.get('/', (req, res) => {
  // Check if request accepts HTML
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } else {
    // Return JSON for API clients
    res.status(200).json({ 
      success: true,
      message: 'Cards REST API',
      version: '1.0.0',
      endpoints: {
        'GET /cards': 'List all cards',
        'GET /cards/:id': 'Get a specific card',
        'POST /cards': 'Create a new card',
        'DELETE /cards/:id': 'Delete a card'
      },
      interface: 'Visit http://localhost:3000 in browser for interactive interface'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

app.use(errorHandler);

module.exports = app;
