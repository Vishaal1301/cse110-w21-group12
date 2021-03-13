function secondsToString(time) {
    let minutes, seconds;

    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

describe("End to end testing", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/source/index.html"); // TODO: change URL when deploy
    });

    describe("Settings and clock interaction tests", () => {
        it("Editing focus time in settings changes focus session time accordingly", () => {
            let time = secondsToString(900); // 15 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke("val", 15).trigger("input");
            
            cy.get("#cup").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000); // First focus

            cy.tick(300000); // First break

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000); // Second focus

            cy.tick(300000); // Second break

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000); // Third focus

            cy.tick(300000); // Third break

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000); // Fourth focus

            cy.tick(900000); // Fourth/extended break

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it("Focus time settings save even after resetting clock", () => {
            let time = secondsToString(1080); // 18 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke("val", 18).trigger("input");
            
            cy.get("#cup").click();

            cy.tick(10000);

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it("Focus time settings save even when skipping break", () => {
            let time = secondsToString(1260); // 21 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke("val", 21).trigger("input");

            cy.get("#cup").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // First focus session

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // Second focus session

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // Third focus session

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // Fourth focus session

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Can edit focus session length during breaks", () => {
            let time = secondsToString(1260); // 21 minutes
            cy.clock();

            cy.get("#cup").click();
            cy.tick(1500000);

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke("val", 21).trigger("input");

            cy.tick(300000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Can edit short break session length during breaks", () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get("#cup").click();
            cy.tick(1500000);

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke("val", 10).trigger("input");

            // cy.get('#clock').then(
            //     $el => {
            //         expect($el.text().trim()).equal(time);
            //     }
            // );

            // cy.tick(600000);
            cy.tick(300000);

            cy.tick(1500000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Can edit long break session length during breaks", () => {
            let time = secondsToString(1200); // 20 minutes
            cy.clock();

            cy.get("#cup").click();
            cy.tick(1500000); // First focus

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#longBreakContainer")
                .find("#longBreakNumber")
                .invoke("val", 20).trigger("input");

            cy.tick(300000);

            cy.tick(1500000); // Second focus

            cy.tick(300000);

            cy.tick(1500000); // Third focus

            cy.tick(300000);

            cy.tick(1500000); // Fourth focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Editing short break time in settings changes break session time accordingly", () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke("val", 10).trigger("input");
            
            cy.get("#cup").click();

            cy.tick(1500000); // First focus
            
            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(600000); // First break

            cy.tick(1500000); // Second focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(600000); // Second break

            cy.tick(1500000); // Third focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it("Edited short break time saves even when skipping", () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke("val", 10).trigger("input");
            
            cy.get("#cup").click();

            cy.tick(1500000); // First focus
            
            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.tick(1500000); // Second focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.tick(1500000); // Third focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Editing short break time in settings saves even after entire cycle", () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke("val", 10).trigger("input");
            
            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(600000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(600000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(600000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.tick(900000); // Fourth/extended break

            cy.tick(1500000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it("Editing long break time in settings is reflected in clock", () => {
            let time = secondsToString(1200); // 20 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#longBreakContainer")
                .find("#longBreakNumber")
                .invoke("val", 20).trigger("input");
            
            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it("Editing focus and break time in settings at once is reflected in clock", () => {
            let focusTime = secondsToString(1200); // 20 minutes
            let shortBreakTime = secondsToString(600); // 10 minutes
            let longBreakTime = secondsToString(1200);  // 20 minutes

            cy.clock();

            cy.get("#navIcon").click();

            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke("val", 20).trigger("input");
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke("val", 10).trigger("input");
            cy.get("#settingContent")
                .shadow()
                .find("#longBreakContainer")
                .find("#longBreakNumber")
                .invoke("val", 20).trigger("input");

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(focusTime);
                }
            );
            
            cy.get("#cup").click();

            cy.tick(1200000); // First focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(shortBreakTime);
                }
            );

            cy.tick(600000); // First break

            cy.tick(1200000); // Second focus

            cy.tick(600000); // Second break

            cy.tick(1200000); // Third focus

            cy.tick(600000); // Third break

            cy.tick(1200000); // Fourth focus

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(longBreakTime);
                }
            );

        });
    });

    describe("Task list and clock interaction tests", () => {
        it("\"No focus task selected\" should be displayed when clock is started with no focus task or tasks", () => {
            cy.get("#cup").click();

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("No focus task selected");
                }
            );
        });

        it("\"No focus task selected\" should be displayed when clock is started with tasks but no focus task", () => {
            cy.get("#new-task")
                .type("Test task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .type("Test task 2")
                .type("{enter}", {force: true});

            cy.get("#cup").click();

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("No focus task selected");
                }
            );
        });

        it("Focus task is correctly displayed throughout sessions when clock is started", () => {
            cy.get("#new-task")
                .type("Focus Task")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#mainTaskSelector")
                .click();

            cy.clock();
            cy.get("#cup").click();

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Focus Task");
                }
            );

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Focus Task");
                }
            );

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Focus Task");
                }
            );

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Focus Task");
                }
            );

            cy.tick(1500000); // Fourth focus

            cy.tick(900000); // Extended break

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Focus Task");
                }
            );
        });

        it("Can add tasks during break", () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.clock();
            cy.get("#cup").click();

            cy.tick(1500000);

            cy.get("#new-task")
                .type("Test Task 2")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .type("Test Task 3")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=0]")
                .invoke("val")
                .then(
                    $el => {
                        expect($el.trim()).equal("Test Task 1");
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=1]")
                .invoke("val")
                .then(
                    $el => {
                        expect($el.trim()).equal("Test Task 2");
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=2]")
                .invoke("val")
                .then(
                    $el => {
                        expect($el.trim()).equal("Test Task 3");
                    }
                );
        });

        it("Tasks added during break are saved across sessions", () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.clock();
            cy.get("#cup").click();

            cy.tick(1500000);

            cy.get("#new-task")
                .type("Test Task 2")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .type("Test Task 3")
                .type("{enter}", {force: true});

            cy.tick(300000);

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=0]")
                .invoke("val")
                .then(
                    $el => {
                        expect($el.trim()).equal("Test Task 1");
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=1]")
                .invoke("val")
                .then(
                    $el => {
                        expect($el.trim()).equal("Test Task 2");
                    }
                );

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=2]")
                .invoke("val")
                .then(
                    $el => {
                        expect($el.trim()).equal("Test Task 3");
                    }
                );
        });

        it("Can add tasks and change focus tasks during breaks", () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.clock();
            cy.get("#cup").click();

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("No focus task selected");
                }
            );

            cy.tick(1500000);

            cy.get("#new-task")
                .type("Test Task 2")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .type("Test Task 3")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=0]")
                .parent()
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#mainTaskSelector")
                .click();

            cy.tick(300000);

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Test Task 1");
                }
            );

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=2]")
                .parent()
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#mainTaskSelector")
                .click();

            cy.tick(300000);

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Test Task 3");
                }
            );
        });

        it("Focus task saves across sessions and cycles", () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#mainTaskSelector")
                .click();

            cy.clock();
            cy.get("#cup").click();

            cy.tick(1500000);

            cy.tick(300000);
            
            cy.tick(1500000);

            cy.tick(300000);

            cy.tick(1500000);

            cy.tick(300000);

            cy.tick(1500000);

            cy.tick(900000);

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Test Task 1");
                }
            );
        });

        it("Adding and deleting focus task before starting the clock reflects accordingly", () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#mainTaskSelector")
                .click();

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#deleteButton")
                .click();
            
            cy.get("#cup").click();

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("No focus task selected");
                }
            );
        });

        it("Adding and deleting focus task during break session reflects accordingly", () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#mainTaskSelector")
                .click();

            cy.clock();
            cy.get("#cup").click();

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("Test Task 1");
                }
            );

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#deleteButton")
                .click();

            cy.tick(300000);

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal("No focus task selected");
                }
            );
        });

        it('Unselecting focus task reflects when clock is started', () => {
            cy.get("#new-task")
                .type("Test Task 1")
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

            cy.clock();
            cy.get('#cup').click();

            cy.get('#focusTask').then(
                $el => {
                    expect($el.text().trim()).equal("Test Task 1");
                }
            );

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click();

            cy.tick(300000);

            cy.get('#focusTask').then(
                $el => {
                    expect($el.text().trim()).equal("No focus task selected");
                }
            );
        });

        it('Adding and deleting task reflects across sessions', () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#mainTaskSelector")
                .click();

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#deleteButton")
                .click();

            cy.clock();
            cy.get("#cup").click();

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .get(".taskItem")
                .should("not.exist");
        });

        it("Deleting tasks during break sessions is reflected across sessions", () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .type("Test Task 2")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .type("Test Task 3")
                .type("{enter}", {force: true});

            cy.clock();
            cy.get("#cup").click();

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=1]")
                .parent()
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke("show")
                .find("#deleteButton")
                .click();

            cy.tick(300000);

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=1]")
                .invoke("val")
                .then(
                    $el => {
                        expect($el.trim()).equal("Test Task 3");
                    });
        });

        it('Checked off tasks are saved across sessions', () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("input[type=checkbox]")
                .click()

            cy.get("#new-task")
                .type("Test Task 2")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .type("Test Task 3")
                .type("{enter}", {force: true});

            cy.clock();
            cy.get('#cup').click();

            cy.tick(1500000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .get("[id=0]")
                .then(
                    $el => {
                        expect($el).to.have.attr("style", "color: rgb(179, 179, 179); text-decoration: line-through;");
                    }
                );
        });
    });

    describe('General interaction tests', () => {
        it('Changing focus session length does not affect task list/focus task', () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .click()
                .find("#mainTaskSelector")
                .click();

            let time = secondsToString(900); // 15 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke('val', 15).trigger('input');

            cy.get('#cup').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.get('#focusTask').then(
                $el => {
                    expect($el.text().trim()).equal("Test Task 1");
                }
            );

            cy.tick(900000);

            cy.get("#new-task")
                .get("#tasks")
                .find(".taskItem")
                .click()
                .find(".dropdown")
                .find(".dropdown-content")
                .invoke('show')
                .find("#mainTaskSelector")
                .click();
            
            cy.tick(300000);

            cy.get('#focusTask').then(
                $el => {
                    expect($el.text().trim()).equal("No focus task selected");
                }
            );
        });

        it('Settings and tasklist do not display during focus sessions', () => {
            cy.get("#new-task")
                .type("Test Task 1")
                .type("{enter}", {force: true});

            let time = secondsToString(900); // 15 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke('val', 15).trigger('input');

            cy.get('#cup').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000);

            cy.get("#new-task")
                .type("Test Task 2")
                .type("{enter}", {force: true});

            cy.get("#navIcon").click();
            
            cy.tick(300000);

            cy.get('#navIcon')
                .should('not.be.visible');

            cy.get('#settingContent')
                .shadow()
                .should('not.exist');
        });
    });
});