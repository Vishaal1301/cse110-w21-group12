describe('Setting test', () => {
    beforeEach(() => {
      cy.visit("http://127.0.0.1:5500/source/index.html"); // TODO: change URL when deploy
    });
    
    describe("open/close setting window test", () => {
        it("open/close setting button when clicking on setting button/x", () => {
            cy.get("#navIcon").click();
            cy.get("#settingsContainer").then(
                $el => {
                    expect($el).to.have.attr("style", "display: block;")
                }
            )
            cy.get("#navIcon").click();
            cy.get("#settingsContainer").then(
                $el => {
                    expect($el).to.have.attr("style", "display: none;");
                }
            );
        });
    });
    
    describe("cafe and alarm volume test", () => {
        it("cafe volume number changes when cafe volume slider changes", () => {
            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#cafeVolumeContainer")
                .find("#cafeVolumeSlider")
                .invoke('val', 33).trigger('input')
    
            cy.get("#settingContent")
                .shadow()
                .find("#cafeVolumeContainer")
                .find("#cafeVolumeNumber")
                .should('have.text',"33")
        });

        it("alarm volume number changes when alarm volume slider changes", () => {
            cy.get("#navIcon").click();
            cy.get("#settingContent")
                .shadow()
                .find("#alarmVolumeContainer")
                .find("#alarmVolumeSlider")
                .invoke('val', 50).trigger('input')
    
            cy.get("#settingContent")
                .shadow()
                .find("#alarmVolumeContainer")
                .find("#alarmVolumeNumber")
                .should('have.text',"50");
        });
    });

    describe('setting focus and break session length test', () => {
        describe('test setting focus session length', () => {
            it("inputting valid focus session length should change focus session length display", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .find("#focusNumber")
                    .invoke('val', 21).trigger('input');

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .find("#focusNumber")
                    .then(
                        $el => {
                            expect($el).to.have.value(21);
                        }
                    );

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });
    
            it("inputting more than maximum focus session length", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .find("#focusNumber")
                    .type("9999")
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: red;");
                        }
                    );
            });

            it("inputting less than minimum focus session length", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .find("#focusNumber")
                    .clear()
                    .invoke('val', 1).trigger('input')
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: red;");
                        }
                    );
            });

            it("Focus session length focus out on valid input", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .find("#focusNumber")
                    .clear()
                    .invoke('val', 25).trigger('input')

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .click();
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });

            it("Reset invalid focus session back to last valid input", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .find("#focusNumber")
                    .type("9999")

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .click();
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#focusNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });
        });

        describe('test setting short break session length', () => {
            it("inputting valid short break session length should change short break session length display", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakContainer")
                    .find("#shortBreakNumber")
                    .invoke('val', 10).trigger('input');
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakContainer")
                    .find("#shortBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.value(10);
                        }
                    );

                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });
    
            it("inputting more than maximum short break session length", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakContainer")
                    .find("#shortBreakNumber")
                    .type("9999")
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: red;");
                        }
                    );
            });

            it("inputting less than minimum short break session length", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakContainer")
                    .find("#shortBreakNumber")
                    .clear()
                    .invoke('val', 1).trigger('input')
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: red;");
                        }
                    );
            });

            it("Short break focus out on valid input", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakContainer")
                    .find("#shortBreakNumber")
                    .clear()
                    .invoke('val', 5).trigger('input')

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .click();
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });

            it("Reset invalid short break length back to last valid input", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakContainer")
                    .find("#shortBreakNumber")
                    .clear()
                    .invoke('val', 1).trigger('input')

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .click();
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#shortBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });
        });

        describe('test setting long break session length', () => {
            it("inputting valid long break session length should change long break session length display", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakContainer")
                    .find("#longBreakNumber")
                    .invoke('val', 11).trigger('input');

                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakContainer")
                    .find("#longBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.value(11);
                        }
                    );

                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });
    
            it("inputting more than maximum long break session length", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakContainer")
                    .find("#longBreakNumber")
                    .type("9999")
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: red;");
                        }
                    );
            });

            it("inputting less than minimum long break session length", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakContainer")
                    .find("#longBreakNumber")
                    .clear()
                    .invoke('val', 1).trigger('input')
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: red;");
                        }
                    );
            });

            it("Long break focus out on valid input", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakContainer")
                    .find("#longBreakNumber")
                    .clear()
                    .invoke('val', 15).trigger('input')

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .click();
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            })

            it("Reset invalid long break length back to last valid input", () => {
                cy.get("#navIcon").click();
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakContainer")
                    .find("#longBreakNumber")
                    .clear()
                    .invoke('val', 1).trigger('input')

                cy.get("#settingContent")
                    .shadow()
                    .find("#focusContainer")
                    .click();
                
                cy.get("#settingContent")
                    .shadow()
                    .find("#longBreakNumber")
                    .then(
                        $el => {
                            expect($el).to.have.attr("style", "background-color: rgb(24, 29, 40);");
                        }
                    );
            });
            
        });
    });
});
