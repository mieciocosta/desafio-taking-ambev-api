Cypress.Commands.add('login', () => {
  cy.fixture('testData').then((data) => {
    cy.request({
      method: 'POST',
      url: '/login', // Base URL será usada
      body: data.login,
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = `${response.body.authorization}`;
      cy.log('Token obtido:', token);
      Cypress.env('authToken', token); // Armazena o token no ambiente
    });
  });
});




// Requisição autenticada
Cypress.Commands.add('authRequest', (method, endpoint, body = null) => {
  const token = Cypress.env('authToken');
  if (!token) throw new Error('Token de autenticação ausente.');

  return cy.request({
    method,
    url: endpoint,
    headers: {
      Authorization: token,
    },
    body,
    failOnStatusCode: false,
  });
});
