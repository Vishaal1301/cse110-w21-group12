describe("TaskList test", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/source/index.html"); // TODO: change URL when deploy
    });

    describe("add/remove task", () => {
        it("add 1 task", () => {
            // Add a task
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true})
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).list.length).to.eq(1);
                    }
                );
    
            // Check task container has 1 task
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

        it("add empty task", () =>{
            cy.get("#new-task")
                .type("{enter}", {force: true});

            cy.get("#taskListContainer")
                .get("#tasks")
                .children()
                .should("have.length", 0);
        });

        it("add 15 tasks", () => {
            for(let i = 1; i <= 15; i++){
                cy.get("#new-task")
                .type("task " + i)
                .type("{enter}", {force: true});
            }

            cy.get("#taskListContainer")
            .get("#tasks")
            .children()
            .should("have.length", 12);

        });

        it("Remove task out of multiple", () => {
            for(let i = 1; i <= 3; i++){
                cy.get("#new-task")
                .type("task " + i)
                .type("{enter}", {force: true});
            }

            cy.get("#new-task")
            .get("#tasks")
            .find(".taskItem")
            .first()
            .click()
            .find(".dropdown")
            .click()
            .find("#deleteButton")
            .click();

            cy.get("#taskListContainer")
            .get("#tasks")
            .children()
            .should("have.length", 2);
        })
    });
    
    describe("set/unset focus", () => {
        it("set focus task", () => {

            for(let i = 1; i <= 3; i++){
                cy.get("#new-task")
                .type("task " + i)
                .type("{enter}", {force: true});
            }

            // Check the first task
            cy.get("#new-task")
                .get("#tasks")
                .get("input[type=checkbox]")
                .first()
                .click()

            // focus the last task
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .last()
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click()

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=text]")
                .last()
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

        it("check focused task", () =>{

            // Create a new task
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            // Focus the task
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click()

            // Check the task focused task
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=checkbox]")
                .click()
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).mainTask.id)
                        .to.eq(null);
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

    describe("Edit task", () => {
        it("change task name", () => {

            // Create a new task
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});


            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=0]")
                .click()
                .clear()
                .type("task 2")
                .type("{enter}", {force: true})
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).list[0].name)
                        .to.eq("task 2");
                    }
                );
        });

        it("change task name to be emtpy", () => {

            for(let i = 1; i <= 3; i++){
                cy.get("#new-task")
                .type("task " + i)
                .type("{enter}", {force: true});
            }

            // Edit task name to be emtpy
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=0]")
                .click()
                .clear()
                .type("{enter}", {force: true})
                .then(
                    () => {
                        expect(JSON.parse(localStorage.getItem("tasks")).list.length)
                        .to.eq(2);
                    }
                );
            
        });
    });

    describe("dropdown menu", () => {
        it("clicking away removes dropdown menu", () => {

            // Create a new task
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            // Open the dropdown
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .click();
            
            // Click somewhere else
            cy.get("#new-task")
                .click();

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .then(
                    ($el) => {
                        expect($el).to.have.attr("style", "display: none;");
                    }
                );            
        });

        it("clicking the dropdown menu twice hides the dropdown", () => {

            // Create a new task
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            // Click the dropdown
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .click();
            
            // Click the dropdown
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .find(".dropdown")
                .click();
            
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .find(".dropdown")
                .find(".dropdown-content")
                .then(
                    ($el) => {
                        expect($el).to.have.attr("style", "display: none;");
                    }
                );            
        });

        it("Dropdown menu does not have focus for checked task", ()=> {
            // Create a new task
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            // Check the task
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=checkbox]")
                .click()
            
            // Open the dropdown
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .click();
            
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .find("#mainTaskSelector")
                .then(
                    ($el) => {
                        expect($el).to.have.attr("style", "display: none;");
                    }
                ); 

        });
    });

    describe("Reload page", () => {

        it("reload a checked task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=checkbox]")
                .click()

            cy.reload()

            cy.get("#taskListContainer")
                .get("#tasks")
                .children()
                .should("have.length", 1);
        })

        it("reload a focused task", () => {
            cy.get("#new-task")
                .type("task 1")
                .type("{enter}", {force: true});

            // Focus the task
            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click()

            cy.reload()

            cy.get("#taskListContainer")
                .get("#tasks")
                .children()
                .should("have.length", 1);
        })

    });
});