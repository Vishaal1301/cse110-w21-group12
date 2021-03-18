# Settings feature

* Status: accepted
* Deciders: Jessica, Zhaoge
* Date: 2021-02-06

Technical Story: https://github.com/Vishaal1301/cse110-w21-group12/issues/2

## Context and Problem Statement

Create settings button including functionalities such as changing volume, changing default work/break session length.

## Decision Drivers <!-- optional -->

* The user should be allowed to customize the app

## Considered Options

* Plain HTML and JS in the main file
* Create a custom Settings component using the ShadowDOM

## Decision Outcome

Chosen option: "Create a custom component using the ShadowDOM", because a custom component is easier to manange.

### Positive Consequences <!-- optional -->

* Easier for developers to maintain the code for the Settings feature

### Negative Consequences <!-- optional -->

* Slightly harder to implement

## Pros and Cons of the Options <!-- optional -->

### Plain HTML and JS in the main file

* Good, because it is straight forward to implement
* Bad, because it is hard to maintain afterwards

### Create a custom Settings component using the ShadowDOM

* Good, because it is easier to manange (changing) styles and JS scripts
* Bad, because it is slightly more complicated to implement

<!-- markdownlint-disable-file MD013 -->
