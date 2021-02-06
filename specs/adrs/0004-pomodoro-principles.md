# Website features and design will follow Pomodoro principles

* Status: accepted 
* Deciders: Tristin, Vishaal, Annie, Jessica, Muhammad, Gary, Alan, Kevin
* Date: 2021-02-03

## Context and Problem Statement

The Pomodoro Technique is at the heart of our project. It emphasizes minimizing distractions and procrastination during work time to increase our productivity. How do we make our design, features, tech, etc. follow the philosophy of the Pomodoro Principles?
## Decision Drivers <!-- optional -->

* As we brainstormed some features were too complex for Pomodoro or didn't belong in the Minimum Viable Product
* We want our finished product to have the core features that are necessary for an effective Pomodoro session.

## Considered Options

* A one click system to start a hard coded autoplay Pomodoro session (25 minute work, 5 minute break, every 4 sessions take a longer break) with options to include tasks
* A manual timer with no autoplay and users can input tasks and choose different timers themselves
* A one click system with autoplay that is based on the tasks inputted, users may have to add more Pomodoro sessions as necessary

## Decision Outcome

Chosen option: "One click hard coded", because it is the simplest to implement right now while following strictly with Pomodoro Technique. Users will not be able to mix and match timers from the manual option and we will not have to implement a complex system to base our timers on custom inputted tasks.

### Positive Consequences <!-- optional -->

* Gives more direction for our design and development process
* Non-binding, can decide to add other features if we choose to do so as add-ons

### Negative Consequences <!-- optional -->

* Restricting user freedom on how to use the timer
* May oversimplify the Pomodoro process since its focusing on the core principles

## Pros and Cons of the Options <!-- optional -->

### One Click Hard Coded

* Good, because does not allow users to misuse or cheat on the Pomodoro Technique
* Good, because simple to implement
* Bad, because restricts user choice

### Manual Timers

* Good, because easy to implement
* Good, because allows customization with utilizing our app
* Bad, because can clutter the interface with lots of buttons
* Bad, because users can not follow the Pomodoro Principles

### One Click Dynamic Based On Tasks

* Good, because more automation for users
* Good, because it can have possible more data to input for each task
* Bad, because hard to implement well
* Bad, because can get confusing for users with too many options and may go against Pomodoro Principles