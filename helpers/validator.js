function validateNotEmpty(input) {
    if (input.trim() === '') {
      return 'Input cannot be empty';
    }
    return true;
  }
  

  module.exports = { validateNotEmpty };
  