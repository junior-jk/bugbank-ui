describe('Cadastro usuario com saldo ', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://bugbank.netlify.app/#')

    });


    it('cadastro com sucesso', () => {

        // cadastro
        cy.get('.ihdmxA').click()

        cy.get(':nth-child(2) > .input__default').first().type('teste@teste34.com', { force: true })

        cy.get(':nth-child(3) > .input__default').first().type('jkl', { force: true })
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').type('d123456', { force: true })
        cy.get('input[name="passwordConfirmation"]').first().type('d123456', { force: true })
        cy.get('#toggleAddBalance').click({ force: true })

        cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true })
        cy.get('#btnCloseModal').click({ force: true })


        // login
        cy.get('input[name="email"]').first().type('teste@teste34.com', { force: true })

        cy.get('input[name="password"]').first().type('d123456', { force: true })

        // Envia o formulário
        cy.get('.otUnI').click()
        cy.url().should('eq', 'https://bugbank.netlify.app/home');

        // Verifica se o texto de boas-vindas está visível
        cy.contains('jkl').should('be.visible', { force: true });
        cy.contains('Saldo em conta R$ 1.000,00')
            .then(($el) => {
                expect($el).to.be.visible;
            })
    })


    it('Campo nome vazio', () => {
        // cadastro com campo nome vazio
        cy.get('.ihdmxA').click()
        cy.get(':nth-child(2) > .input__default').first().type('teste@teste123.com', { force: true })
        // nome vazio
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').type('d123456', { force: true })
        cy.get('input[name="passwordConfirmation"]').first().type('d123456', { force: true })
        cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true })
        cy.contains('Nome não pode ser vazio.').should('be.visible');
    })

    it('Campo email vazio', () => {
        // cadastro com campo email vazio
        cy.get('.ihdmxA').click()
        // email vazio
        cy.get(':nth-child(3) > .input__default').first().type('jkl', { force: true })
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').type('d123456', { force: true })
        cy.get('input[name="passwordConfirmation"]').first().type('d123456', { force: true })
        cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true })
        cy.get('.kOeYBn > .input__warging').should('have.text', 'É campo obrigatório');


    })
    it('Campo senha vazio', () => {
        // cadastro com campo email vazio
        cy.get('.ihdmxA').click()
        cy.get(':nth-child(2) > .input__default').first().type('teste@teste123.com', { force: true })
        cy.get(':nth-child(3) > .input__default').first().type('jkl', { force: true })
        // senha vazio
        cy.get('input[name="passwordConfirmation"]').first().type('d123456', { force: true })
        cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true })
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__warging')
            .should('have.text', 'É campo obrigatório');

        // cy.contains('É campo obrigatório').should('be.visible', { force: true });

    })


    it('Campo confirmacao de senha vazio', () => {
        // cadastro com campo email vazio
        cy.get('.ihdmxA').click()
        cy.get(':nth-child(2) > .input__default').first().type('teste@teste123.com', { force: true })
        cy.get(':nth-child(3) > .input__default').first().type('jkl', { force: true })
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').type('d123456', { force: true })// senha
        // confirmacao senha vazio
        cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true })


        cy.get(':nth-child(5) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__warging')
            .should('have.text', 'É campo obrigatório');

    })

    it('Senhas não confere', () => {
        cy.get('.ihdmxA').click()
        cy.get(':nth-child(2) > .input__default').first().type('teste@teste123.com', { force: true })
        cy.get(':nth-child(3) > .input__default').first().type('jkl', { force: true })
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').type('d123456', { force: true })// senha
        cy.get('input[name="passwordConfirmation"]').first().type('d12346', { force: true })//senhas diferente
        cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true })
        cy.get('p#modalText.styles__Text-sc-8zteav-4.gpcLtj')
            .should('have.text', 'As senhas não são iguais.\n');


    })


})
