// secretKeyGenerator.js

// Function to generate a random secret key
function generateSecretKey() {
    return Math.random().toString(36).substr(2, 15);
  }
  
  // Export the generateSecretKey function
  module.exports = {generateSecretKey};
  