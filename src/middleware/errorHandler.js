// Generic error handler (fallback)
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error('Error:', err);
  
  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON format',
      details: err.message
    });
  }
  
  // Default error response
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({ 
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;
