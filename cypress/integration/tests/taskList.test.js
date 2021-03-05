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
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList
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
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList
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
                        expect($el).to.have.attr("style", "color: rgb(238, 208, 57);");
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
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList
                .find("#mainTaskSelector")
                .click();
            
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList 
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show') // TODO: might need to change this to click() after Kevin update the TaskList
                .find("#mainTaskSelector")
                .click()
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).mainTask.name)
                        .to.eq(null);
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=text]")
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "color: white;");
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
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "text-decoration: line-through;");
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
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "text-decoration: none;");
                    }
                );
        });
    })
});