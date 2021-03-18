# Application responsiveness to different screen sizes and form factors

* Status: accepted 
* Deciders: Tristin, Vishaal, Annie, Alan, Gary, Muhammad, Kevin, Jessica
* Date: 2021-03-09

## Context and Problem Statement

Our application as of date is working pretty well overall on desktop and laptop screens. However, once the screen size strays from common ratios or when form factors change like on phones and tablets, our application does not scale gracefully. We are almost at our deadline, should we rearrange and add to the CSS to make our app more accessible or should we polish up what we have and make sure it works really well on desktop and laptops.

## Decision Drivers

* We are on a time crunch, so changing the code too majorly is seen as an major opportunity cost
* Our application really doesn't scale too well as of date, and might drive away potential users if they are constrained to certain form factors
* We want our application to be accessible to all who wants to use it

## Considered Options

* Don't think about responsive design, just leave it
* Adjust the CSS mildly to get rid of major problems with scaling
* Completely make the application responsive to screen size and form factors. With adjusting component locations in a desirable way on mobile devices.

## Decision Outcome

Chosen option: a mixture of all of them. A lot of us during the last week are busy and will try to do what we can. We decided if we have time it will be nice to do the third option, but the first option is also good if testers feel like we need to focus on polishing more.

### Positive Consequences

* No huge commitment that might hurt us
* Leaves the door open for team members that want to tackle this task

### Negative Consequences 

* May lead to responsive design not looked into at all because we decided to be so relaxed about it

## Pros and Cons of the Options

### Not thinking about responsive design

* Good, because it saves time
* Bad, because it makes our application less accessible and complete

### Adjusting CSS mildly for major scaling issues

* Good, because gets us most of the way there without huge commitment
* Good, because addresses responsive design still
* Bad, because it may take a lot more time than we think it will

### Fully responsive to different screens and form factors

* Good, because will make our app really accessible and have a sense of completeness
* Bad, because will take a lot of time and may make our app less polished