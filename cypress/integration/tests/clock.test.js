function secondsToString(time) {
    let minutes, seconds;

    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

describe("Clock tests", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/source/index.html"); // Change URL when deploy
    });

    describe("First focus session tests", () => {
        it("Clock time is correct at first", () => {
            let time = secondsToString(1500); // 25 minutes

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock starts at correct time when clicked", () => {
            let time = secondsToString(1499); // 24 minutes 59 seconds

            cy.clock();
            cy.get("#cup").click();
            cy.tick(1000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock displays correct time after x seconds", () => {
            let x = 270; // seconds
            let time = secondsToString(1500 - 270);

            cy.clock();
            cy.get("#cup").click();
            cy.tick(x * 1000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock restarts when started and stopped", () => {
            let time = secondsToString(1500); // 25 minutes

            cy.clock();
            cy.get("#cup").click();
            cy.tick(1000);

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();
            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });
    });

    describe("First break session tests", () => {
        it("Break clock time is correct after first focus session", () => {
            cy.clock();

            let time = secondsToString(300); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Hover over clock displays \"skip break?\" during short break", () => {
            cy.clock();
            
            cy.get('#cup').click();

            cy.tick(1500000);

            cy.get("#cup")
                .trigger("mouseover");

            cy.get("#session")
                .contains("Skip Break?");
        });

        it("Hover over clock displays \"skip break?\" during long break", () => {
            cy.clock();

            cy.get('#cup').click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.tick(1000); // Fourth/extended break

            cy.get("#cup")
                .trigger("mouseover");

            cy.get("#session")
                .contains("Skip Break?");

        });

        it("Break clock time starts automatically", () => {
            cy.clock();

            let time = secondsToString(299); // 4 minutes 59 seconds

            cy.get("#cup").click();

            cy.tick(1501000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Break clock displays correct time after x seconds", () => {
            let x = 40; // seconds

            cy.clock();

            let time = secondsToString(300 - x); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000);

            cy.tick(x * 1000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock goes to next focus session when break clock is stopped", () => {
            let time = secondsToString(1500); // 25 minutes

            cy.clock();
            cy.get("#cup").click();

            cy.tick(1500000);
            cy.tick(1000);

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock goes to next focus session and starts automatically when break clock is stopped", () => {
            let time = secondsToString(1499); // 24 minutes 59 seconds

            cy.clock();
            cy.get("#cup").click();

            cy.tick(1500000);
            cy.tick(1000);

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.tick(1000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });
    });

    describe("Clock works when going between sessions", () => {
        it("Go to second focus session", () => {
            cy.clock();

            let time = secondsToString(1499); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1000); //1 second

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Go to second break session", () => {
            cy.clock();

            let time = secondsToString(299); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(1000); //1 second

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Go to third focus session", () => {
            cy.clock();

            let time = secondsToString(1499); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1000); //1 second

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Go to third break session", () => {
            cy.clock();

            let time = secondsToString(299); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(1000); //1 second

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Go to fourth focus session", () => {
            cy.clock();

            let time = secondsToString(1499); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.tick(1000); // 1 second

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Go to fourth/last and extended break session", () => {
            cy.clock();

            let time = secondsToString(899); // 5 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.tick(1000); // 1 second

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock goes back after last break session concludes", () => {
            cy.clock();

            let time = secondsToString(1500); // 25 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.tick(900000); // Fourth/extended break

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock goes back to first focus session after skipping last break session", () => {
            cy.clock();

            let time = secondsToString(1500); // 25 minutes

            cy.get("#cup").click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.tick(1000); // Fourth/extended break

            cy.get("#cup").click();
            cy.get("#areYouSureYes").click();

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });
    });

    describe("Update settings and check clock", () => {

        it("Focus session time is correct after updating focus time settings", () => {

            let time = secondsToString(900); // 15 minutes

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke("val", 15).trigger("input");
                
            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it("Clock starts correctly when licked after updating focus time settings", () => {
            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke("val", 15).trigger("input");
            
            let time = secondsToString(899); // 14 minutes 59 seconds

            cy.clock();
    
            cy.get("#cup").click();
            cy.tick(1000);

            cy.get("#clock").then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });
    });

    describe("Focus task clock test", () => {

        it("Set focus task and start clock", () => {
            let taskName = "Focus Task";

            cy.get("#new-task")
                .type(taskName)
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
            cy.tick(1000);

            cy.get("#focusTask").then(
                $el => {
                    expect($el.text().trim()).equal(taskName);
                }
            );
        });
    });
});