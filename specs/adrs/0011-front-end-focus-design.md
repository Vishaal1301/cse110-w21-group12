# Front End Design Change

* Status: accepted 
* Deciders:  Annie, Vishaal, Jessica
* Date: 2021-03-01


## Context and Problem Statement

In our original design, we had a sticky note on the landing page that shows the main task that the user is focusing on. After changing our design, we completely removed the display of this sticky note. Wiith just a task list, we decided to add more variety to our website by including the tab that shows the task the user if focusing on. This aligns ultimately aligns with the Pomodoro Method too.

## Decision Drivers

* Right side container was plain
* User experience didnt reflect the Pomodoro method.

## Considered Options

* Using the word 'work' instead of focus
* Putting it below the timer
* Putting a star icon to show that that's the task we're focusing on

## Decision Outcome

Chosen option: Show the focus screen when the user is using the timer. When they're on a break, the user can change their focus task. Their focused tasked is highlighed in yellow in the task list.

* Design and interface mostly looks way nicer. Not cluttered (the icon would have made the page look cluttered)
* Adds to the user experience by giving the user more options

### Negative Consequences

* Getting the right focus task from local storage to show up
* More states to consider since we are adding the focus state

## Pros and Cons of the Options

### Using the word 'work' instead of focus

* Good, because many Pomodoro timers use the work focus
* Bad, because focus articulates the goal of the Pomodoro method and I (Annie) liked this more

### Putting it below the timer

* Good, the user can see the task at all times, less confusion when things on the scren changes
* Bad, because it didnt look aesthetically pleasing with the design. everything was aligned to the left and right of the screen

### Putting a star icon to show that that's the task we're focusing on

* Good, because it would be easy to toggle the icon
* Bad, because it would make our page look cluttered with too many things showing at once

### New design with focus session in right bar container

* Good, because the user gets to experience more from our website and see the focus task, not only just their task list the whole time
* Good, because the user is able to see their focus task while the timer runs, instead of just a blank screen which is unmotivating
* Bad, because will introduce lots more work and take lots of time away from testing and deployment
