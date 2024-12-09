describe('Carrinhos Endpoint Tests', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve listar carrinhos cadastrados', () => {
    cy.request({
      method: 'GET',
      url: '/carrinhos',
      headers: {
        Authorization: Cypress.env('authToken'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.carrinhos).to.be.an('array');
      cy.log('Carrinhos listados:', response.body.carrinhos);
    });
  });

  it('Deve criar um carrinho', () => {
    cy.fixture('testData').then((data) => {
      cy.request({
        method: 'POST',
        url: '/carrinhos',
        headers: {
          Authorization: Cypress.env('authToken'),
        },
        body: data.carrinhos.novoCarrinho,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        cy.log('Carrinho criado:', response.body);
      });
    });
  });

  it('Deve excluir um carrinho existente', () => {
    cy.request({
      method: 'DELETE',
      url: '/carrinhos/concluir-compra',
      headers: {
        Authorization: Cypress.env('authToken'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.include('Registro excluído com sucesso');
      cy.log('Carrinho excluído:', response.body);
    });
  });
});
