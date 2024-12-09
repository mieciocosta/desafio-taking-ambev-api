describe('Login Endpoint Tests', () => {
  it('Deve realizar login com sucesso', () => {
    cy.fixture('testData').then((data) => {
      cy.request({
        method: 'POST',
        url: '/login', // Apenas a rota relativa
        body: data.login, // Credenciais válidas do testData
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('authorization');
        cy.wrap(response.body.authorization).as('authToken');
        cy.log('Login realizado com sucesso. Token obtido:', response.body.authorization);
      });
    });
  });

  it('Deve falhar no login com credenciais inválidas', () => {
    cy.fixture('testData').then((data) => {
      cy.request({
        method: 'POST',
        url: '/login', 
        body: data.loginInvalido,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq('Email e/ou senha inválidos');
        cy.log('Tentativa de login inválido resultou em erro esperado.');
      });
    });
  });
  
});
