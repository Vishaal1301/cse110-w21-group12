# Using babel to run Jest tests

* Status: accepted
* Deciders: Everyone
* Date: 03-2-2021

## Context and Problem Statement

The JavaScript code runs on the browser, and thus uses ES6 import syntax. However, we run Jest testing on npm, which does not support ES6 import syntax. How can we support both ES6 and npm?

## Decision Drivers

* Jest runs on npm
* App needs to run on browser
* Want to run Jest tests without changing code

## Considered Options

* Change the export statements everytime we run Jest
* Use babel to convert ES6 import/export into CJS syntax

## Decision Outcome

Chosen option: "Use babel to convert ES6 import/export into CJS syntax", because it is a permanent solution. 

### Positive Consequences

* No need to change code to run Jest tests
* Permanent solution

### Negative Consequences

* Needs to use Babel (extra libraries and dependencies)
* More time to implement babel

## Pros and Cons of the Options

### Change the export statements everytime we run Jest
* Bad, requires changing code to test
* Good, no extra libraries needed

### Use babel to convert ES6 import/export into CJS syntax
* Good, because it offers a permanent solution
* Good, because no manual code changes is needed to run jest
* Bad, because an extra library is added
