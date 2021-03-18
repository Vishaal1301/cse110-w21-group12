# disable eslint and jsdoc on cypress

* Status: accepted
* Deciders: Muhammad Fajar
* Date: 2021-02-28

Technical Story: no github issue was made

## Context and Problem Statement

A run of eslint on a branch with cypress configured at any location, provided that the linter is ran on
top level, will introduce a ridiculous quantity of failures. This fault can be attributed to unconventional
formatting of cypress syntax, at least in light of our eslint config. This effect also rang true for jsdoc.

## Decision Drivers <!-- optional -->

* Best way to eliminate failed builds, with regard to eslint and jsdoc.
* There is no real reason why we want to document cypress test the same way we document other sources.

## Considered Options

* reconfigure eslint and jsdoc to conform to cypress, possibly a plugin
* manually fix the errors, auto fix provided by both tools didn't manage to fix everything. (impossible)
* remove cypress altogether until merge to testing
* limit both of those tools to only run inside /source folder.

## Decision Outcome

Chosen option: "I had to limit both of those tools to only run inside /source folder.", this was the only
option that didn't introduce so many side effects outside of the scope of cypress. Also the first option
would take way more time to get figured out, the second option is humanly impossible, and the third one would
complicate the integration later as we do need cypress.

### Positive Consequences <!-- optional -->

* easy pass for eslint.

### Negative Consequences <!-- optional -->

* no linting and jsdoc for cypress tests

