function secondsToString(time) {
    let minutes, seconds;

    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

describe('End to end testing', () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/source/index.html"); // TODO: change URL when deploy
    });

    describe('Settings and clock interaction tests', () => {
        it('Editing focus time in settings changes focus session time accordingly', () => {
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

            cy.tick(900000); // First focus

            cy.tick(300000); // First break

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000); // Second focus

            cy.tick(300000); // Second break

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000); // Third focus

            cy.tick(300000); // Third break

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(900000); // Fourth focus

            cy.tick(900000); // Fourth/extended break

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it('Focus time settings save even after resetting clock', () => {
            let time = secondsToString(1080); // 18 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke('val', 18).trigger('input');
            
            cy.get('#cup').click();

            cy.tick(10000);

            cy.get('#cup').click();
            cy.get('#areYouSureYes').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it('Focus time settings save even when skipping break', () => {
            let time = secondsToString(1260); // 21 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke('val', 21).trigger('input');

            cy.get('#cup').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // First focus session

            cy.get('#cup').click();
            cy.get('#areYouSureYes').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // Second focus session

            cy.get('#cup').click();
            cy.get('#areYouSureYes').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // Third focus session

            cy.get('#cup').click();
            cy.get('#areYouSureYes').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(1260000); // Fourth focus session

            cy.get('#cup').click();
            cy.get('#areYouSureYes').click();

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it('Can edit focus session length during breaks', () => {
            let time = secondsToString(1260); // 21 minutes
            cy.clock();

            cy.get('#cup').click();
            cy.tick(1500000);

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#focusContainer")
                .find("#focusNumber")
                .invoke('val', 21).trigger('input');

            cy.tick(300000);

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it('Can edit short break session length during breaks', () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get('#cup').click();
            cy.tick(1500000);

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke('val', 10).trigger('input');

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(600000);

            cy.tick(1500000);

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it('Can edit long break session length during breaks', () => {
            let time = secondsToString(1200); // 20 minutes
            cy.clock();

            cy.get('#cup').click();
            cy.tick(1500000); // First focus

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#longBreakContainer")
                .find("#longBreakNumber")
                .invoke('val', 20).trigger('input');

            cy.tick(300000);

            cy.tick(1500000); // Second focus

            cy.tick(300000);

            cy.tick(1500000); // Third focus

            cy.tick(300000);

            cy.tick(1500000); // Fourth focus

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it('Editing short break time in settings changes break session time accordingly', () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke('val', 10).trigger('input');
            
            cy.get('#cup').click();

            cy.tick(1500000); // First focus
            
            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(600000); // First break

            cy.tick(1500000); // Second focus

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.tick(600000); // Second break

            cy.tick(1500000); // Third focus

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it('Edited short break time saves even when skipping', () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke('val', 10).trigger('input');
            
            cy.get('#cup').click();

            cy.tick(1500000); // First focus
            
            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.get('#cup').click();
            cy.get('#areYouSureYes').click();

            cy.tick(1500000); // Second focus

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

            cy.get('#cup').click();
            cy.get('#areYouSureYes').click();

            cy.tick(1500000); // Third focus

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );
        });

        it('Editing short break time in settings saves even after entire cycle', () => {
            let time = secondsToString(600); // 10 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#shortBreakContainer")
                .find("#shortBreakNumber")
                .invoke('val', 10).trigger('input');
            
            cy.get('#cup').click();

            cy.tick(1500000); // First focus

            cy.tick(600000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(600000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(600000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.tick(900000); // Fourth/extended break

            cy.tick(1500000);

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });

        it('Editing long break time in settings is reflected in clock', () => {
            let time = secondsToString(1200); // 20 minutes
            cy.clock();

            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#longBreakContainer")
                .find("#longBreakNumber")
                .invoke('val', 20).trigger('input');
            
            cy.get('#cup').click();

            cy.tick(1500000); // First focus

            cy.tick(300000); // First break

            cy.tick(1500000); // Second focus

            cy.tick(300000); // Second break

            cy.tick(1500000); // Third focus

            cy.tick(300000); // Third break

            cy.tick(1500000); // Fourth focus

            cy.get('#clock').then(
                $el => {
                    expect($el.text().trim()).equal(time);
                }
            );

        });
    });
});