// cypress.config.js
module.exports = {
  video: true,
  e2e: {
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    baseUrl: 'http://localhost:3000',  // Certifique-se de que este endereço esteja corret    
  },
};
