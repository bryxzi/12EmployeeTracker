function logError(error) {
    console.error(`Error: ${error.message}`);
  }
  
  function logInfo(message) {
    console.log(`Info: ${message}`);
  }
  
  module.exports = { logError, logInfo };
  