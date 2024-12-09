describe('Produtos Endpoint Tests', () => {
  let produtoId;

  beforeEach(() => {
    cy.login(); 
  });

  it('Deve listar produtos cadastrados', () => {
    cy.request({
      method: 'GET',
      url: '/produtos',
      headers: {
        Authorization: Cypress.env('authToken'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.be.an('array');
      cy.log('Produtos listados:', response.body.produtos);
    });
  });

  it('Deve cadastrar um novo produto', () => {
    cy.fixture('testData').then((data) => {
      const uniqueProduct = {
        ...data.produtos.novoProduto,
        nome: `${data.produtos.novoProduto.nome} ${Date.now()}`, // Nome único
      };

      cy.request({
        method: 'POST',
        url: '/produtos',
        headers: {
          Authorization: Cypress.env('authToken'),
        },
        body: uniqueProduct,
      }).then((response) => {
        cy.log('Payload enviado:', uniqueProduct);
        cy.log('Response Body:', response.body);

        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        produtoId = response.body._id;
        cy.log('Produto criado com ID:', produtoId);
      });
    });
  });

  it('Deve editar um produto existente', () => {
    expect(produtoId).to.exist;

    cy.fixture('testData').then((data) => {
      const editPayload = {
        ...data.produtos.produtoEditado,
        nome: `${data.produtos.produtoEditado.nome} ${Date.now()}`,
      };

      cy.request({
        method: 'PUT',
        url: `/produtos/${produtoId}`,
        headers: {
          Authorization: Cypress.env('authToken'),
        },
        body: editPayload,
      }).then((response) => {
        cy.log('Response Body:', response.body);

        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro alterado com sucesso');
      });
    });
  });

  it('Deve excluir um produto existente', () => {
    expect(produtoId).to.exist;

    cy.request({
      method: 'DELETE',
      url: `/produtos/${produtoId}`,
      headers: {
        Authorization: Cypress.env('authToken'),
      },
    }).then((response) => {
      cy.log('Response Body:', response.body);

      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });
});
