# Singular HTML and CSS files

* Status: accepted
* Deciders: Kevin, Alan, Muhammad, Tristen
* Date: 02-03-2021

## Context and Problem Statement

How should the HTML and CSS be organized for the timer? Should we have separate files for separate components, or a singular HTML file and singular CSS file?

## Decision Drivers

* Timer app only has a singular page (home page)
* Home page only has a few components
* No plans to reuse components

## Considered Options

* Singular HTML file and singular CSS file
* Separate HTML and CSS files for different components and pages

## Decision Outcome

Chosen option: "Singular HTML file and singular CSS file", because the app is not complex enough to warrant multiple HTML and CSS files.

### Positive Consequences

* Easier and faster to implement

### Negative Consequences

* Harder to modularize
* Potentially more merge conflicts
* Harder to reuse components in the future

## Pros and Cons of the Options

### Singular HTML file and singular CSS file
* Good, because the design makes sense for a simple timer
* Good, because it is easier to implement
* Bad, because it is not modularized

### Multiple HTML and CSS files
* Good, because it is modularized
* Good, because it is easy to expand on
* Bad, because it is unnecessary 