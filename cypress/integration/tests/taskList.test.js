describe("TaskList test", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/source/index.html"); // TODO: change URL when deploy
    });

    describe("add/remove task", () => {
        it("add 1 task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true})
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).list.length).to.eq(1);
                    }
                );
    
            cy.get("#taskListContainer")
                .get("#tasks")
                .children()
                .should("have.length", 1);
        });
    
        it("remove 1 task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});
    
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#deleteButton")
                .click()
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).list.length).to.eq(0);
                    }
                );
    
            cy.get("#taskListContainer")
                .get("#tasks")
                .children()
                .should("have.length", 0);
        });
    });
    
    describe("set/unset focus", () => {
        it("set focus task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});
        
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click()
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).mainTask.name)
                        .to.eq("task 1");
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=text]")
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "color: rgb(238, 208, 57); text-decoration: none;");
                    }
                );
        });

        it("unset focus task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});
        
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click();
            
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click()
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).mainTask.id)
                        .to.eq(null);
                        expect(JSON.parse(localStorage.getItem("tasks")).mainTask.name)
                        .to.eq(undefined);
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=text]")
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "color: white; text-decoration: none;");
                    }
                );
        });
    });

    describe("check/uncheck task", () => {
        it("check task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=checkbox]")
                .click()
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).list[0].checked)
                        .to.eq(true);
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=text]")
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "color: rgb(179, 179, 179); text-decoration: line-through;");
                    }
                );
        });

        it("uncheck task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=checkbox]")
                .click();

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=checkbox]")
                .click()
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).list[0].checked)
                        .to.eq(false);
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=text]")
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "color: white; text-decoration: none;");
                    }
                );
        });
    })
});