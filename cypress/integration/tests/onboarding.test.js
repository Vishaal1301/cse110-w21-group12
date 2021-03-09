describe("onboarding test", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/source_test/index.html"); // TODO: change URL when deploy
    });

    it("click question mark", () => {
        // click the onboarding icon
        cy.get("#onboardingIcon")
            .click()

        cy.get("#onboardingContainer")
            .should("be.visible");

        cy.get("#rightSideContainer")
            .should("not.be.visible");

        cy.get("#session")
            .should("not.be.visible");

        cy.get("#onboardingIcon")
            .should("not.be.visible");

        cy.get("#xicon")
            .should("be.visible");

    });
    
    it("click x button", () => {
        // click the onboarding icon
        cy.get("#onboardingIcon")
            .click()

        cy.get("#xicon")
            .click()

        cy.get("#onboardingContainer")
            .should("not.be.visible");

        cy.get("#rightSideContainer")
            .should("be.visible");

        cy.get("#session")
            .should("be.visible");

        cy.get("#onboardingIcon")
            .should("be.visible");

        cy.get("#xicon")
            .should("not.be.visible");

    });


});