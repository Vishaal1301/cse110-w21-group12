folder for testing related videos

The cross-browser reports don't look perfect because browserstack doesn't recognize cy.get().shadow() as
a valid function. If you take a look at the reports, you can see that the reds don't appear across different browsers,rather it appeared across different files, including the recent chrome, even though all of our cypress tests always passed our pipeline (we have also ran cypress on local to make sure and they indeed pass). This resulted in files without cy.get().shadow being the only ones that appear green on browserstack. We were running out of free trial time limit so we could only offer this explanation as a remedy
for this issue.

The codefactor in fact be an A+. Fixing the plugin issue in causes Cypress to fail when running PRs and changing 0px to 0, repositions the settings icon to an undesired position.
