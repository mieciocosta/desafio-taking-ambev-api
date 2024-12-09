### **README**

---

# **Projeto de Automação Cypress - Testes Automatizados**

Este projeto utiliza o **Cypress** para automação de testes de APIs, cobrindo fluxos de login, carrinhos, usuários e produtos. Ele foi projetado seguindo boas práticas de organização e reutilização de código.

---

## **Instalação**

### **1. Clone o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd projeto-automacao-cypress
```

### **2. Instale as dependências**
Certifique-se de que o Node.js está instalado na máquina. Em seguida, execute:
```bash
npm install
```

---

## **Configuração**

### **1. Base URL**
Certifique-se de que a `baseUrl` está configurada no arquivo `cypress.config.js`. Exemplo:
```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Configurações de eventos
    },
  },
});
```

---

## **Como Rodar os Testes**

### **Modo Interativo**
Execute o comando abaixo para abrir o Cypress em modo interativo:
```bash
npx cypress open
```
1. Selecione o arquivo de teste (ex.: `produtos.cy.js`).
2. Visualize os testes em execução no navegador.

---

### **Modo Headless**
Para rodar os testes sem interface gráfica:
```bash
npx cypress run
```

Os resultados serão exibidos diretamente no terminal. Use este modo para integrar com CI/CD.

---

## **Estrutura do Projeto**

### **Diretórios Principais**

- **`cypress/e2e/`**: Contém os arquivos de teste organizados por módulos.
  - `carrinhos.cy.js`: Testes relacionados aos carrinhos.
  - `produtos.cy.js`: Testes relacionados aos produtos.
  - `usuarios.cy.js`: Testes relacionados aos usuários.
  - `login.cy.js`: Testes relacionados ao login.

- **`cypress/fixtures/`**: Contém dados estáticos usados nos testes.
  - `testData.json`: Dados de entrada para testes, como credenciais e payloads.

- **`cypress/support/`**: Contém utilitários e comandos personalizados.
  - `commands.js`: Comandos customizados como `cy.login()` e `cy.authRequest()` para simplificar os testes.
  - `e2e.js`: Configurações globais aplicadas antes de cada teste.

---

## **Fluxos Automatizados**

1. **Login**
   - Login com credenciais válidas.
   - Tentativa de login com credenciais inválidas (verificação de mensagens de erro).

2. **Carrinhos**
   - Listagem de carrinhos cadastrados.
   - Criação de um novo carrinho.
   - Exclusão de carrinhos existentes.

3. **Produtos**
   - Listagem de produtos cadastrados.
   - Criação de produtos com nomes únicos.
   - Edição e exclusão de produtos.

4. **Usuários**
   - Listagem de usuários cadastrados.
   - Criação, edição e exclusão de usuários.

---

## **Boas Práticas no Projeto**

1. **Uso da `baseUrl`**
   - Todas as URLs são relativas, facilitando a manutenção do projeto.

2. **Centralização de Dados**
   - Dados de teste estão organizados em `cypress/fixtures/testData.json`.

3. **Reutilização de Código**
   - Comandos personalizados em `commands.js` para ações comuns como login e requisições autenticadas.

---

## **Contribuições**

### **Como Contribuir**
1. **Crie Novos Cenários de Teste**
   - Adicione novos arquivos em `cypress/e2e/` para novos módulos ou funcionalidades.

2. **Melhore a Cobertura de Testes**
   - Inclua casos de borda e cenários negativos para validar a robustez das APIs.

3. **Reporte Problemas**
   - Utilize o sistema de issues do repositório para reportar bugs ou solicitar melhorias.

---

### **Contato**

Para dúvidas, sugestões ou suporte, entre em contato:
- **E-mail:** miecio.costa@gmail.com
- **Desenvolvedor:** Miécio Santos Costa

**🚀 Boas práticas e automação eficiente!**