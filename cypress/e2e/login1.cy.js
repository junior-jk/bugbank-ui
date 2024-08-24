describe('Cadastro e login site BugBank', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('login com sucesso', () => {

        cy.visit('https://bugbank.netlify.app/#')

        // cadastro
        cy.get('.ihdmxA').click()

        cy.get(':nth-child(2) > .input__default').first().type('teste3@teste.com', { force: true })

        cy.get(':nth-child(3) > .input__default').first().type('jk', { force: true })
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').type('d123456', { force: true })
        cy.get('input[name="passwordConfirmation"]').first().type('d123456', { force: true })
        cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true })
        cy.get('#btnCloseModal').click({ force: true })

        // login
        cy.get('input[name="email"]').first().type('teste3@teste.com', { force: true })

        cy.get('input[name="password"]').first().type('d123456', { force: true })

        // Envia o formulário
        cy.get('.otUnI').click()
        cy.url().should('eq', 'https://bugbank.netlify.app/home');

        // Verifica se o texto de boas-vindas está visível
        cy.contains('Olá jk').should('be.visible', { force: true });

    })

    it('login invalido', () => {
        cy.visit('https://bugbank.netlify.app/#')

        // login invalido
        cy.get('.otUnI').click()
        cy.contains('É campo obrigatório').should('be.visible', { force: true });
    })


    it(' Login com credenciais inválida', () => {
        cy.visit('https://bugbank.netlify.app/#')

        // login credenciais invalida
        cy.get('input[name="email"]').first().type('teste3@teste.com', { force: true })

        cy.get('input[name="password"]').first().type('0DC', { force: true })

        // Envia o formulário
        cy.get('.otUnI').click()
        cy.contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
            .then(($el) => {
                expect($el).to.be.visible;
            })
    })

    it('Login com nome de usuário válido e senha incorreta', () => {
        cy.visit('https://bugbank.netlify.app/#')

        cy.get('input[name="email"]').first().type('testejk@teste.com', { force: true })

        cy.get('input[name="password"]').first().type('d12456', { force: true })

        // Envia o formulário
        cy.get('.otUnI').click()
        cy.contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
            .then(($el) => {
                expect($el).to.be.visible;
            })
    })

    it(' Login com nome de usuário e senha inválidos', () => {
        cy.visit('https://bugbank.netlify.app/#')

        cy.get('input[name="email"]').first().type('teste3teste.com', { force: true })

        cy.get('input[name="password"]').first().type('d6', { force: true })

        // Envia o formulário
        cy.get('.otUnI').click()
        cy.contains('Formato inválido')
            .then(($el) => {
                expect($el).to.be.visible;
            })

    })

    it(' tentativa de Login sem cadastro', () => {
        cy.visit('https://bugbank.netlify.app/#')

        cy.get('input[name="email"]').first().type('testejk@teste.com', { force: true })

        cy.get('input[name="password"]').first().type('d12456', { force: true })

        // Envia o formulário
        cy.get('.otUnI').click()
        cy.contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
            .then(($el) => {
                expect($el).to.be.visible;
            })
    })
})


