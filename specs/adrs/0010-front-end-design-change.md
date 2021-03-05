# Front End Design Change

* Status: accepted 
* Deciders:  Tristin, Vishaal, Annie, Jessica, Muhammad, Gary, Alan, Kevin
* Date: 2021-02-28


## Context and Problem Statement

The original design we came up with had a plain design and pixel art coffee cup timer. Should we keep our UI/UX plain with potentially bad scaling or should we go with the new design?

## Decision Drivers

* The background was implemented using background-color CSS property, it didn't look too good
* The UI didn't have a cohesive design, seperate components looks stiched together
* Drawn pixel art coffee cup timer didn't scale well on larger screens

## Considered Options

* Keeping the old design with no change
* Make minor changes to old design like replacing the coffee cup image
* Implement a new design with a background image instead of background color with cup as part of background
* New design with modular components (so cup and background would be seperate)

## Decision Outcome

Chosen option: new design with background image, because it brought a large improvement to the look of the user interface without needing large overhaul of our codebase. The most ambitious option, new design with modular components, would look really good and scale well but will introduce lots more work and would potentially interfere with testing. Keeping with old design was unanimously rejected.

### Positive Consequences

* Design and interface mostly looks way nicer
* More cohesive and simple design

### Negative Consequences

* Introduced more work
* Some parts of the new design may be slightly inferior than old design

## Pros and Cons of the Options

### Keeping the old design with no change

* Good, because no need for more work
* Good, because might look better to some people
* Bad, because bad scaling and incohesive design

### Make minor changes to old design like replacing the coffee cup image

* Good, because requires almost no coding work
* Bad, because may be hard to find image to suit our needs

### Implement a new design with a background image instead of background color with cup as part of background

* Good, because only requires some light coding
* Good, because already designed by design team and looks nicer
* Bad, because still introduced overhead that took some time away

### New design with modular components (so cup and background would be seperate)

* Good, because will bring about a cohesive, scalable, nice looking UI
* Bad, because will introduce lots more work and take lots of time away from testing and deployment