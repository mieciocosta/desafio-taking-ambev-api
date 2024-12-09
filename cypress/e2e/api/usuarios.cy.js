describe('Usuários Endpoint Tests', () => {
  let usuarioId;

  beforeEach(() => {
    cy.login(); // Faz o login e configura o token
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios',
      headers: {
        Authorization: Cypress.env('authToken'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.usuarios).to.be.an('array');
    });
  });

  it('Deve cadastrar um novo usuário', () => {
    cy.fixture('testData').then((data) => {
      const uniqueEmail = `teste${Date.now()}@qa.com.br`;
      const newUser = { ...data.usuarios.novoUsuario, email: uniqueEmail };

      cy.request({
        method: 'POST',
        url: '/usuarios',
        headers: {
          Authorization: Cypress.env('authToken'),
        },
        body: newUser,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        usuarioId = response.body._id; 
        cy.log('Usuário criado com ID:', usuarioId);
      });
    });
  });

  it('Deve buscar usuário por ID', () => {
    expect(usuarioId).to.exist;

    cy.request({
      method: 'GET',
      url: `/usuarios/${usuarioId}`,
      headers: {
        Authorization: Cypress.env('authToken'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(usuarioId);
    });
  });

  it('Deve editar um usuário existente', () => {
    expect(usuarioId).to.exist;

    cy.fixture('testData').then((data) => {
      const updatedUser = { ...data.usuarios.usuarioEditado, email: `editado${Date.now()}@qa.com.br` };

      cy.request({
        method: 'PUT',
        url: `/usuarios/${usuarioId}`,
        headers: {
          Authorization: Cypress.env('authToken'),
        },
        body: updatedUser,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro alterado com sucesso');
      });
    });
  });

  it('Deve excluir um usuário existente', () => {
    expect(usuarioId).to.exist;

    cy.request({
      method: 'DELETE',
      url: `/usuarios/${usuarioId}`,
      headers: {
        Authorization: Cypress.env('authToken'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.include('Registro excluído com sucesso');
    });
  });
});
